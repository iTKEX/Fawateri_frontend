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
const baseURL = "/reminders/"

// FUNCTIONS
export async function getAllReminders() {
    return sendRequest(baseURL);
}