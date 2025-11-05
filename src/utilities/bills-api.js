/*
TABLE OF CONTENT
- IMPORTS
- CONSTANTS
- FUNCTIONS:
    - getAllBills
    - getBillDetails
    - createNewBill
    - updateBill
    - deleteBill
    - upsertBillImage
    - deleteBillImage
    - getAllCategories
    - setBillCategories
    - createReminder
    - deleteReminder
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

export async function upsertBillImage(billId, formData) {
    return sendRequest(`${baseURL}${billId}/image/`, "POST", formData);
}

export async function deleteBillImage(billId) {
    return sendRequest(`${baseURL}${billId}/image/`, "DELETE");
}

export async function getAllCategories() {
    return sendRequest('/categories/');
}

export async function setBillCategories(billId, categoryIds) {
    return sendRequest(`/bills/${billId}/categories/`, "POST", { category_ids: categoryIds });
}

export async function createReminder(billId, payload) {
    return sendRequest(`/bills/${billId}/reminders/`, "POST", payload);
}

export async function deleteReminder(billId, reminderId) {
    return sendRequest(`/bills/${billId}/reminders/${reminderId}/`, "DELETE");
}