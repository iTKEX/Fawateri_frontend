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

export async function getBillDetails(billId) {
    return sendRequest(`${baseURL}${billId}`);
}

export async function createNewBill(formData) {
    console.log(formData)
    return sendRequest(baseURL, "POST", formData);
}

export async function updateBill(billId, formData) {
    return sendRequest(`${baseURL}${billId}/`, "PUT", formData)
}

export async function deleteBill(billId) {
    return sendRequest(`${baseURL}${billId}/`, "DELETE")
}