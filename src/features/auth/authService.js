import axios from "axios";
import { Navigate } from "react-router-dom";

// Register user
const register = async(userData) => {
    const response = await axios.post(
        "http://localhost:5000/api/condidats/",
        userData
    );

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

// Login user
const login = async(userData) => {
    const response = await axios.post(
        "http://localhost:5000/api/condidats/login",
        userData
    );
    console.log(response, "from the serveer");

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

// Logout user
const logout = () => {
    localStorage.removeItem("user");
    Navigate("/login");
    return true;
};

const authService = {
    register,
    logout,
    login,
};

export default authService;