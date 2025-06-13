# 🏃‍♂️ Marathon Management System

A full-stack web application for creating, managing, and participating in marathon events. Built using React, Tailwind, Firebase, MongoDB, and Node.js, this system enables users to register, organize, and monitor marathons securely and responsively across all devices.

🔗 **Live Site:** https://hobby-hub-ef096.web.app 
🌟 Highlights (Key Features)

- ✅ Users can **create**, **view**, **update**, and **delete** marathon events.
- ✅ Anyone can **register for a marathon** during the registration period.
- ✅ Each event shows a **real-time countdown timer** until the marathon starts.
- ✅ Authenticated users have access to a **private dashboard**.
- ✅ All features are **fully mobile responsive** for smooth experience on any device.

## 🚀 Features

- 🔐 **User Authentication** (Email/Password + Google login)
- 🏁 **Create & Manage Marathons** (Private dashboard for organizers)
- 📋 **User Registration for Marathons** with live registration status
- 🗃️ **My Marathons & My Apply List Pages** with update/delete options
- 📱 **Fully Mobile, Tablet, and Desktop Responsive Design**
- 🎯 **JWT Protected Routes** and Firebase Authentication
- 🔍 **Search by Title** in Apply List (Client-side)
- ⏳ **Countdown Timer** to Marathon Start
- 🎨 **SweetAlert & Toast Notifications** for user feedback
- 📄 **Dynamic Page Titles** using `react-helmet`
- ❌ **Custom 404 Not Found Page**
- 🔁 **Persisted Login on Page Reload** for Private Routes

---

## 📦 Technologies & Libraries Used

### 👨‍💻 Client-Side
- React
- React Router DOM
- Tailwind CSS
- DaisyUI
- Firebase Auth
- React Hook Form
- React Datepicker
- React Countdown Circle Timer
- SweetAlert2
- React Helmet Async

### 🛠️ Server-Side
- Express.js
- MongoDB
- JWT (jsonwebtoken)
- CORS
- dotenv
- Firebase Admin SDK
- Vercel (for deployment)

---

## 📚 Project Pages & Features

- `Home Page`: Banner, 6 Featured Marathons, 6 Upcoming Marathons, 2 Extra Sections
- `Login/Register`: With validation (uppercase, lowercase, length ≥ 6), and success/error alerts
- `Add Marathon`: Form with validation & date pickers
- `All Marathons Page`: Grid layout with sorting option (`createdAt` newest/oldest)
- `Marathon Details Page`: Shows details, registration status, and live countdown
- `My Marathons Page`: Table layout with Update & Delete buttons (modal-based)
- `My Apply List Page`: Table/Card view with Search, Update, Delete
- `Private Routes`: Auth protected with JWT token verification
- `404 Page`: Custom design with navigation link

---

## 🛡️ Security & Best Practices

- Used `.env` to hide Firebase config and MongoDB credentials
- Implemented `verifyFirebaseToken` and `verifyTokenByEmail` middlewares
- Client sends token via `Authorization: Bearer <token>` headers
- Secure form handling and protected user data

## 🧪 Deployment

- **Client:** Firebase Hosting  
- **Server:** Vercel

## 👨‍💻 Author
Md Maidul Islam

