/*
TABLE OF CONTENT
- IMPORTS
- CONSTANTS
- FUNCTIONS:
    - getAllBills

*/

// IMPORTS
import sendRequest from "./sendRequest";

// CONSTANTS
const baseURL = "/bills/"

// FUNCTIONS
export async function getAllBills() {
    return sendRequest(baseURL);
}

export async function createNewBill(formData) {
    console.log(formData)
    return sendRequest(baseURL, "POST", formData);
}