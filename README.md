# Prime Call

A full-stack video conferencing web application — like Zoom, built from scratch. Create or join meetings instantly with HD video, screen sharing, and in-call chat.

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI library (component-based JavaScript) |
| **JavaScript (JSX)** | Application logic and UI components |
| **React Router v6** | Client-side routing (`/`, `/auth`, `/home`, `/history`, `/:meetingCode`) |
| **Material UI (MUI) v5** | Buttons, inputs, cards, icons |
| **Emotion** | CSS-in-JS styling engine used by MUI |
| **Axios** | HTTP requests to the backend REST API |
| **Socket.IO Client** | Real-time signaling for WebRTC peer connections |
| **WebRTC API** | Camera, microphone, screen share, peer-to-peer video |
| **Create React App** | Build tooling and dev server |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express.js** | REST API server |
| **Socket.IO** | WebSocket server for call signaling & chat |
| **MongoDB + Mongoose** | User accounts and meeting history storage |
| **bcrypt** | Password hashing |
| **CORS** | Cross-origin requests from frontend |

### Real-Time Communication
- **WebRTC** — peer-to-peer audio/video streams
- **Google STUN server** — NAT traversal for connections
- **Socket.IO** — room join, ICE candidates, chat messages

---

## Features

- User registration and login with JWT token auth
- Start a new meeting or join with a meeting code
- Guest access (no login required)
- HD video and audio controls (mute / camera off)
- Screen sharing
- In-call text chat
- Meeting history for logged-in users
- Responsive UI across desktop and mobile

---

## Project Structure

```
Zoom/
├── frontend/                 # React app
│   ├── public/               # Static assets
│   └── src/
│       ├── components/       # Reusable UI (navbar, logo)
│       ├── contexts/         # AuthContext (login, history)
│       ├── pages/            # Landing, Auth, Home, History, VideoMeet
│       ├── styles/           # CSS modules for video call UI
│       ├── utils/            # withAuth HOC, meeting code generator
│       ├── App.js            # Routes
│       ├── theme.js          # MUI theme
│       └── environment.js    # Backend URL config
│
└── backend/                  # Node.js API + Socket.IO
    └── src/
        ├── app.js            # Server entry point
        ├── controllers/      # User & socket logic
        ├── models/           # MongoDB schemas
        └── routes/           # REST API routes
```

---

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (or local MongoDB)
- Modern browser with camera/mic support (Chrome recommended)

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

Server runs on **http://localhost:8000**

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

App opens on **http://localhost:3000**

### 3. Connect Frontend to Backend

Edit `frontend/src/environment.js`:

```javascript
let IS_PROD = false;  // set false for local development

const server = IS_PROD
    ? "https://your-deployed-backend.com"
    : "http://localhost:8000";

export default server;
```

---

## API Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/users/register` | Create new account |
| POST | `/api/v1/users/login` | Login, returns JWT token |
| GET | `/api/v1/users/get_all_activity` | Get meeting history |
| POST | `/api/v1/users/add_to_activity` | Save meeting to history |

---

## Pages

| Route | Page | Auth Required |
|---|---|---|
| `/` | Landing page | No |
| `/auth` | Login / Register | No |
| `/home` | Dashboard (start/join meeting) | Yes |
| `/history` | Past meetings | Yes |
| `/:code` | Video call room | No (guest allowed) |

---

## How a Video Call Works

1. User opens a meeting URL (e.g. `/abc123`)
2. Enters name in the lobby and grants camera/mic permission
3. Socket.IO connects to the backend and joins the room
4. WebRTC creates peer connections between participants
5. Video/audio streams flow directly between browsers (P2P)
6. Chat messages go through the Socket.IO server

---

## Environment Variables

Backend MongoDB connection is configured in `backend/src/app.js`. For production, use environment variables instead of hardcoded credentials.

---

## Scripts

### Frontend
```bash
npm start      # Development server
npm run build  # Production build
npm test       # Run tests
```

### Backend
```bash
npm run dev    # Development with nodemon
npm start      # Production
```

---

## License

ISC
