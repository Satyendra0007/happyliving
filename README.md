# Hostel Management App (MERN Stack)

## 📌 Overview
The **Hostel Management App** is a full-stack web application built using the **MERN** (MongoDB, Express.js, React.js, and Node.js) stack. The application provides two different dashboards: one for users and another for administrators.

## 🚀 Features

### 🔹 User Dashboard
- Register and log in to the system.
- View available hostel room types and their prices.
- Send messages or inquiries to the admin.

### 🔹 Admin Dashboard
- Manage user accounts.
- View and respond to user messages.
- Add, update, and delete hostel room types.
- Set and update room prices.
- Upload and manage images using **Cloudinary**.

## 🛠️ Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **State Management:** Context API 
- **Authentication:** JWT (JSON Web Token)
- **Styling:** Tailwind CSS 
- **UI Components:** Flowbite
- **Image Storage:** Cloudinary
- **Deployment:** Vercel

## ⚙️ Installation and Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Satyendra0007/happyliving.git
   cd happyliving
   ```

2. **Backend Setup:**
   ```sh
   cd backend
   npm install
   npm run dev
   ```

3. **Frontend Setup:**
   ```sh
   cd frontend
   npm install
   npm run dev
   ```

4. **Environment Variables:**
   - Create a `.env` file in the backend folder and configure the following:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     ```

## 📷 Screenshots
(Add screenshots of the app here, if available)

## 🌐 Visit Site
https://happyliving.vercel.app/

## 📞 Contact
For any queries, reach out to **skchandrawansi03@gmail.com**.
