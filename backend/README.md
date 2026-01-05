# 🎥 Video Sensitivity & Streaming Platform - Backend

Backend for a full-stack platform that allows:
- Video Upload
- Sensitivity Processing (Safe / Flagged)
- Real-Time Progress Updates
- Secure Streaming (HTTP Range)
- Multi-Tenant + RBAC
- Caching + Compression + CDN Ready

---

## 🚀 Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- Socket.io
- Multer (Upload)
- FFmpeg (Compression + Processing)
- JWT Auth
- Redis (Optional Caching)

---

## 📦 Install Dependencies

npm install

---

## 🔐 Environment Setup
Create `.env`

```
PORT=5000
MONGO_URI=
JWT_SECRET=
REFRESH_SECRET=
UPLOAD_PATH=uploads
```

---

## ▶️ Run Backend
Dev:


- npm run dev


Prod:


- npm start


---

## 🧪 Testing


npm test


---

## 🐳 Docker Run


docker build -t video-backend .
docker run -p 5000:5000 video-backend


---

## 📡 API Routes
Auth:
- POST /api/auth/register
- POST /api/auth/login

Videos:
- POST /api/videos/upload
- GET /api/videos

Streaming:
- GET /api/stream/:id

Tenants:
- POST /api/tenants
- GET /api/tenants

---

## 🎯 Features
✔ Upload  
✔ Processing  
✔ Sensitivity Classification  
✔ Real-Time Updates  
✔ Streaming  
✔ RBAC  
✔ Multi-Tenant  
✔ Filtering + Search  
✔ Compression  
✔ CDN Ready  
✔ Public Deployment Ready

---

## ✅ Status
Backend is 100% ready 🎉