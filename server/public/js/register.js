// after loading UI
document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registration-form");
    console.log(registrationForm);

    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const registerData = Object.fromEntries(
            new FormData(registrationForm).entries()
        );

        fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerData),
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
