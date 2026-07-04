# 🎥 Prime Call — Real-Time Video Conferencing

> Connect instantly. No downloads. No hassle. Just open and call.

**Prime Call** is a full-stack video conferencing web app built from scratch using WebRTC, Socket.io, React.js, and Node.js. Users can register, create a meeting room, and share the link — anyone with the link can join the call directly from their browser.

🌐 **Live Demo:** [https://primecall-frontend.onrender.com](https://primecall-frontend.onrender.com)

---

## ✨ Features

- 🔐 **Auth System** — Register & login with secure password hashing (bcryptjs)
- 👤 **Guest Join** — Join any room instantly without an account
- 📹 **HD Video Calls** — Real-time peer-to-peer video via WebRTC
- 🔗 **Shareable Room Links** — One-click copy, share with anyone
- 🔇 **Mic & Camera Toggle** — Mute/unmute anytime during a call
- 🖥️ **Screen Sharing** — Share your screen with all participants
- 💬 **In-Call Chat** — Send messages while on a video call
- 📋 **Meeting History** — Logged-in users can view past meetings

---

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|---|---|
| React.js | UI framework |
| React Router DOM | Client-side routing |
| Socket.io-client | Real-time signaling |
| Material UI | UI components |
| WebRTC (native) | Peer-to-peer video/audio |

### Backend
| Tech | Purpose |
|---|---|
| Node.js + Express | REST API server |
| Socket.io | WebRTC signaling |
| MongoDB + Mongoose | Database |
| bcryptjs | Password hashing |
| CORS | Cross-origin support |

### Deployment
| Service | Platform |
|---|---|
| Frontend | Render (Web Service) |
| Backend | Render (Web Service) |
| Database | MongoDB Atlas |

---

## 📁 Project Structure

```
PrimeCall/
│
├── frontend/                   # React.js app
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── _redirects          # SPA routing fix
│   └── src/
│       ├── components/         # Reusable UI components
│       ├── contexts/           # AuthContext (login/register/history)
│       ├── pages/
│       │   ├── LandingPage.jsx
│       │   ├── Authentication.jsx
│       │   ├── HomeComponent.jsx
│       │   ├── VideoMeet.jsx   # Core WebRTC room
│       │   └── History.jsx
│       ├── environment.js      # Backend URL config
│       └── App.js
│
├── backend/                    # Node.js + Express API
│   └── src/
│       ├── app.js              # Entry point
│       ├── controllers/        # Business logic
│       ├── models/             # MongoDB schemas
│       └── routes/             # API routes
│
├── .gitignore
└── README.md
```

---

## ⚙️ Getting Started Locally

### Prerequisites
- Node.js v16+
- npm v8+
- MongoDB Atlas account (free tier)

### 1. Clone the repo
```bash
git clone https://github.com/harsh7agarwal/PrimeCall.git
cd PrimeCall
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=8000
MONGO_URI=your_mongodb_atlas_connection_string
FRONTEND_URL=http://localhost:3000
```

Run backend:
```bash
node src/app.js
```

### 3. Setup Frontend
```bash
cd frontend
npm install
```

Create `frontend/.env`:
```env
REACT_APP_SERVER_URL=http://localhost:8000
```

Run frontend:
```bash
npm start
```

App runs at `http://localhost:3000` 🚀

---

## 🔄 How WebRTC Works Here

```
User A                  Signaling Server (Socket.io)              User B
  |                              |                                   |
  |------- join room ----------->|                                   |
  |                              |<---------- join room -------------|
  |<------ user joined ----------|                                   |
  |                                                                   |
  |------- SDP Offer ----------->|---------- SDP Offer ------------->|
  |<------ SDP Answer -----------|<--------- SDP Answer -------------|
  |------- ICE Candidate ------->|---------- ICE Candidate --------->|
  |                                                                   |
  |<======================== P2P Video Stream ========================>|
```

Socket.io handles the signaling — once both peers exchange SDP and ICE candidates, the video stream goes directly peer-to-peer with no server in between.

---

## 🚢 Deployment (Render)

### Backend — Web Service
| Field | Value |
|---|---|
| Root Directory | `backend` |
| Build Command | `npm install` |
| Start Command | `node src/app.js` |

### Frontend — Web Service
| Field | Value |
|---|---|
| Root Directory | `frontend` |
| Build Command | `npm install && npm run build` |
| Start Command | `npx serve -s build` |

> Add environment variables in Render dashboard for both services.

---

## 📡 API Reference

Base URL: `https://primecall-backend.onrender.com/api/v1/users`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/register` | Create new account | ❌ |
| POST | `/login` | Login & get token | ❌ |
| GET | `/get_all_activity` | Get meeting history | ✅ |
| POST | `/add_to_activity` | Save meeting to history | ✅ |

---

## 👨‍💻 Author

**Harsh Agarwal**
- 🐙 GitHub: [@harsh7agarwal](https://github.com/harsh7agarwal)
- 🎓 BIT Mesra

---

## 📄 License

Open source under the [MIT License](LICENSE).

---

*Built with ❤️ using React, Node.js, WebRTC & Socket.io*