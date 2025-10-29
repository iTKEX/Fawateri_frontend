/*
TABLE OF CONTENT
- IMPORTS
- CONSTANTS
- FUNCTIONS:
    - getAllReminders

*/

// IMPORTS
import sendRequest from "./sendRequest";

// CONSTANTS
const baseURL = "/categories/"

// FUNCTIONS
export async function getAllCategories() {
    return sendRequest(baseURL);
}