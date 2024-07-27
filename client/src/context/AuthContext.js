import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
// eslint-disable-next-line
export const AuthProvider = ({ children }) => {
    // declare the state variables
    const navigate = useNavigate();

    const [user, setUser] = useState(
        localStorage.getItem("authToken")
            ? jwtDecode(JSON.parse(localStorage.getItem("authToken")).access)
            : null
    );

    const [authToken, setAuthToken] = useState(
        localStorage.getItem("authToken")
            ? JSON.parse(localStorage.getItem("authToken"))
            : null
    );

    useEffect(() => {
        const intervelId = setInterval(() => {
            if (authToken) {
                updateToken();
            }
        }, 3300000);
        return () => clearInterval(intervelId);
    });

    // // The funtions to be used in the context
    // 1) loginUser
    const loginUser = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                phone_number: e.target.phone_number.value,
                password: e.target.password.value,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            setUser(jwtDecode(data.access));
            setAuthToken(data);
            localStorage.setItem("authToken", JSON.stringify(data));
            navigate("/dashboard");
        } else {
            alert("Invalid Credentials");
        }
    };

    // 2) logoutUser
    const logoutUser = () => {
        setUser(null);
        setAuthToken(null);
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    // 3) updateToken
    const updateToken = async () => {
        const response = await fetch("/api/token/refresh/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: authToken.refresh }),
        });
        const data = await response.json();
        if (response.ok) {
            setUser(jwtDecode(data.access));
            setAuthToken(data);
            localStorage.setItem("authToken", JSON.stringify(data));
        } else {
            logoutUser();
        }
    };

    const contextData = {
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthContext;
