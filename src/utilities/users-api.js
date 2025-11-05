/*
TABLE OF CONTENT
- IMPORTS
- CONSTANTS
- FUNCTIONS:
    - signup
    - login
    - logout
*/

// IMPORTS
import sendRequest from "./sendRequest";

// CONSTANTS
const url = "/users";

// FUNCTIONS
export async function signup(formData) {
    try {
        const response = await sendRequest(`${url}/signup/`, "POST", formData);
        localStorage.setItem("token", response.access);
        return response.user;
    } catch (error) {
        localStorage.removeItem("token");
        return null;
    }
}

export async function login(formData) {
    try {
        const response = await sendRequest(`${url}/login/`, "POST", formData);
        localStorage.setItem("token", response.access);
        return response.user;
    } catch (error) {
        localStorage.removeItem("token");
        return null;
    }
}

export async function logout() {
    localStorage.removeItem("token");
}
