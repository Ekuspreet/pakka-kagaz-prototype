// after loading UI
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    console.log(loginForm);

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const loginData = Object.fromEntries(
            new FormData(loginForm).entries()
        );

        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        })
            .then(async (response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    const data = await response.json();
                    const error = new Error(
                        "Request failed with status " + response.status
                    );
                    error.data = data;
                    throw error;
                }
            })
            .then((data) => {
                console.log(data);
                alert(data.message);
            })
            .catch((error) => {
                alert(error.data.message);
                console.error(error);
            });
    });
});
