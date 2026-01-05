# 🎥 VideoSense – Intelligent Video Sensitivity Platform

A full-stack **video upload, processing, sensitivity analysis, and streaming platform** built with a modern **MERN architecture**, real-time updates, role-based access control, and multi-tenant isolation.

---

## 🚀 Live Features Overview

✔ Secure user authentication (JWT)  
✔ Multi-tenant architecture (organization-based isolation)  
✔ Role-Based Access Control (Viewer / Editor / Admin)  
✔ Video upload with validation  
✔ Sensitivity analysis (mocked pipeline)  
✔ Real-time processing updates (Socket.io)  
✔ HTTP range-based video streaming  
✔ Responsive dashboard (desktop + mobile)  
✔ Dark / Light theme support  
✔ Admin user management panel  

---

## 🏗️ Tech Stack

### Backend
- Node.js (Latest LTS)
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Socket.io (real-time updates)
- Multer (video uploads)
- FFmpeg (optional / extendable)

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Axios
- Socket.io Client
- Context API

---

## 📁 Project Structure
```
video-sensitivity-platform/
│
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── middleware/
│ │ ├── sockets/
│ │ ├── utils/
│ │ ├── app.js
│ │ └── server.js
│ │
│ ├── uploads/
│ │ ├── raw/
│ │ └── processed/
│ │
│ ├── .env
│ ├── package.json
│ └── Dockerfile
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ ├── hooks/
│ │ ├── services/
│ │ ├── styles/
│ │ ├── router.jsx
│ │ ├── App.jsx
│ │ └── main.jsx
│ │
│ ├── .env
│ └── package.json
│
└── README.md

```

---

## 🔐 Authentication & RBAC

### Roles

| Role   | Permissions |
|------|-------------|
| Viewer | View assigned videos only |
| Editor | Upload & manage videos |
| Admin  | Full access + user management |

### Default Registration Role
- **Editor**
- Admin users must be seeded manually or promoted via admin panel

---

## 🧩 Multi-Tenant Architecture

- Each user belongs to a **Tenant (Organization)**
- Videos are isolated per tenant
- Socket rooms are tenant-specific
- Admin actions are tenant-scoped

---

## 🎬 Video Processing Pipeline

### Implemented Flow

1. **Upload Validation**
   - MP4 format enforced
   - File size limits
2. **Secure Storage**
   - Raw files stored safely
3. **Sensitivity Analysis (Mocked)**
   - Safe / Flagged classification
4. **Real-Time Status Updates**
   - Socket.io progress events
5. **Streaming Preparation**
   - HTTP range streaming (206 Partial Content)

---

## 📡 API Documentation

### 🔐 Authentication APIs

#### Register User
`POST /api/auth/register`

**Request Body**
```json
{
  "name": "Sahil Ahmed",
  "email": "sahil@example.com",
  "password": "password123",
  "tenant": "demo-org"
}
```
**Response***

```json
Copy code
{
  "success": true,
  "message": "User Registered",
  "user": {
    "_id": "userId",
    "email": "sahil@example.com",
    "role": "editor",
    "tenantId": "tenantId"
  }
}
```
> 📌 Default role assigned: Editor

#### Login User
`POST /api/auth/login`

**Request Body**

```json
{
  "email": "sahil@example.com",
  "password": "password123"
}
```
**Response**

```json
{
  "success": true,
  "token": "jwt_access_token",
  "refreshToken": "jwt_refresh_token",
  "user": {
    "_id": "userId",
    "email": "sahil@example.com",
    "role": "admin",
    "tenantId": "tenantId"
  }
}
```

### 🎬 Video APIs
#### Upload Video
`POST /api/videos/upload`

**Headers:**

```
Authorization: Bearer <JWT>
Content-Type: multipart/form-data
```
**Form Data**
```
title: My Demo Video
video: sample.mp4

```
**Response**

```json

{
  "success": true,
  "videoId": "videoId",
  "status": "processing"
}
```

#### List Videos
`GET /api/videos`

**Headers:**

```
Authorization: Bearer <JWT>
```
**Response**

```json

{
  "videos": [
    {
      "_id": "videoId",
      "title": "My Demo Video",
      "status": "processed",
      "classification": "safe"
    }
  ]
}
```
#### Stream Video
`GET /api/stream/:videoId`

**Headers:**

```
Authorization: Bearer <JWT>
Range: bytes=0-
```
**Response**

```
HTTP 206 Partial Content
```
> ✔ Supports seek & progressive playback

---

## ⚙️ Environment Setup
### Backend .env
```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
REFRESH_SECRET=your_refresh_secret
FRONTEND_URL=http://localhost:5173
```
### Frontend .env
```
VITE_API_URL=http://localhost:5000
```

---

## 🧪 Local Development
### Backend
```
cd backend
npm install
npm run dev
```
### Frontend
```
cd frontend
npm install
npm run dev
```
> Frontend: http://localhost:5173
> Backend: http://localhost:5000

---

## 🧪 Testing
### Current Coverage


| Area              | Status            |
| ----------------- | ----------------- |
| API smoke testing | ✅ Manual          |
| Upload validation | ⚠️ Partial        |
| Streaming tests   | ⚠️ Partial        |
| Unit tests        | ❌ Not implemented |
| Integration tests | ❌ Not implemented |


### Manual Testing (Postman)
- Login → copy JWT token

**Add header:**


`Authorization: Bearer <JWT>`
**Test:**

- Upload video
- Stream video
- Role-based access
- Tenant isolation

---

## 📊 Feature Completion Status

| Feature              | Status            |
| -------------------- | ----------------- |
| Upload validation    | ⚠️ Partial        |
| Secure storage       | ✅ Complete        |
| Sensitivity analysis | ✅ Mocked          |
| Real-time updates    | ✅ Complete        |
| Streaming (Range)    | ⚠️ Partial        |
| Filtering (status)   | ✅ Complete        |
| Metadata filtering   | ❌ Not implemented |
| Categories           | ❌ Not implemented |
| Compression          | ❌ Not implemented |
| Caching              | ❌ Not implemented |

---


## 🛡️ Security Measures
- JWT-based authentication
- Role-based route protection
- Tenant-level data isolation
- Secure file handling
- CORS & rate limiting

---

## 🎥 Demo Flow
- Register / Login
- Upload a video
- Watch real-time processing updates
- View sensitivity status
- Stream video securely
- Admin manages users

---
