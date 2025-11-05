# 📄 Fawateri

**Fawateri** is a smart and secure invoice management application that allows users to store, organize, and access all types of invoices in one place, including purchase receipts, car maintenance bills, and device repair invoices.  
It helps users easily retrieve invoices when needed, especially for warranty claims or service follow-ups.

---

## 📘 Project Description

The **Fawateri Frontend** is built using **React** and communicates with the **Fawateri Backend API** (built with Django REST Framework).  
It provides a clean and intuitive interface that allows users to view, create, edit, and manage their bills, reminders, and categories seamlessly.

---

### 🔹 Main Features
- User registration and login  
- Bill management (create, read, update, delete)  
- Upload and view receipt images  
- Assign categories to bills  
- Set reminders for payments or warranty expiration  
- Filter and search bills by merchant, category, or date range  

> Designed for individual users — each user manages their own private data.

---

## 🧩 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Language** | JavaScript |
| **Framework** | React |
| **Routing** | React Router |
| **Backend** | Django REST Framework |
| **Authentication** | JWT |

---

## 🔗 Related Repository

[**Fawateri Backend**](https://github.com/iTKEX/Fawateri_backend)

---

## 🌐 Live Link

[**Frontend**](http://localhost:5173)
## Routing Tabel
### Pages
<table border="1" width="100%">
    <thead>
        <tr>
            <th width="20%">Page</th>
            <th width="40%">Path</th>
            <th width="40%">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Landing</td>
            <td>/</td>
            <td>Main Page for application</td>
        </tr>
        <tr>
            <td>Bills</td>
            <td>/bills</td>
            <td>Main User page list all bills</td>
        </tr>
    </tbody>
</table>

---

## 📄 User Stories

### 🧾 Create Bill
As a user,  
Given I provide a merchant, date, amount, and upload an image,  
When I submit the form,  
Then a bill is created and displayed in my list.

---

### ✏️ Edit Bill
As a user,  
Given an existing bill,  
When I update details like merchant, date, amount, or category,  
Then the changes persist and appear on reload.

---

### 🗂️ Categories
As a user,  
Given available categories,  
When I assign multiple categories to a bill,  
Then the bill displays all assigned categories.

---

### ⏰ Reminders
As a user,  
Given a bill or product with warranty or due date,  
When I add a reminder,  
Then I get notified when the due date approaches.

---

### 🔍 Search & Filter
As a user,  
Given many bills,  
When I filter by category, merchant, or date range,  
Then only matching results are displayed.

---

### 🖼️ Image Management
As a user,  
When I upload an image for a bill,  
Then it appears attached to that bill.  
When I upload a new one,  
Then the old image is replaced automatically.

---

## 🚀 Installation & Running the Project

You can run the **Fawateri Frontend** in two ways:  
**(1) Locally (via Node.js)** or **(2) using Docker Compose**.

---

### 🧱 1. Run Locally

#### Prerequisites
- Node.js v20
- npm or yarn  

#### Steps
```bash
# Clone the repository
git clone https://github.com/iTKEX/Fawateri_frontend
cd Fawateri_frontend
```
```bash
# Install dependencies
npm install
```
```bash
# Start the development server
npm start
```

The app will be available at:  
👉 [http://localhost:5173](http://localhost:3000)

---

### 🐳 2. Run Using Docker

#### Steps
```bash
# Clone the repository
git clone https://github.com/iTKEX/Fawateri_frontend
```
```bash
# Build and start the containers
docker-compose up
```

Once started, the app will be available at:  
👉 [http://localhost:5173](http://localhost:3000)

---

## 🧊 IceBox Features (Planned Enhancements)

- **📱 Native Smartphone App:**  
  Develop a dedicated mobile application for Android and iOS using React Native, sharing the same backend API for synchronization.

- **🔔 Push Notifications:**  
  Integrate mobile notifications for reminders and due bills.

- **☁️ Cloud Sync:**  
  Enable seamless data synchronization between devices via cloud storage.

- **📤 Offline Mode:**  
  Allow users to view and manage cached bills without an internet connection.

- **🔒 Biometric Authentication:**  
  Support Face ID / Fingerprint login in the mobile app for added security.

