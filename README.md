# ⛳ Digital Heros — Golf Charity Tournament App

![Digital Heros Banner](https://img.shields.io/badge/Digital%20Heros-Golf%20Charity%20Tournament-2d9e5f?style=for-the-badge&logo=golf&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)

> A full-stack web application for managing a charity golf tournament — track players, record scores, run monthly prize draws, and raise money for charity. 🎗️

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [How It Works](#-how-it-works)
- [Contributing](#-contributing)

---

## 🏌️ About the Project

**Digital Heros** is a charity golf tournament management platform where players register, log their golf scores, and compete for prizes. The money raised through the tournament goes directly to charity partners.

The app allows:
- **Players** to register, log in, and record their golf scores after every round
- **Admins** to manage all users, view scores, run monthly prize draws, and mark prize payouts
- **Visitors** to see the tournament leaderboard and learn about the charity mission

---

## ✨ Features

### 🏠 Home Page
- Beautiful landing page with tournament information
- Live leaderboard showing top 3 players
- Impact stats — funds raised, players joined, holes played, charity partners
- Sponsor section and call-to-action

### 🎯 Scores Page (Players)
- Add golf scores with date (range: 1–45 points)
- View full personal score history
- Mini stats — Total Rounds, Best Score, Average, This Month
- Live score bar showing Eagle / Birdie / Par / Bogey rating
- Visual bar chart of last 8 rounds

### 🛠️ Admin Panel
- Sidebar navigation with Dashboard, Users, Winners, and Draw tabs
- **Dashboard** — overview stats with colored cards
- **Users** — table of all registered players with avatar initials and join date
- **Winners** — full winners list with prize amounts and payment status
- **Run Draw** — execute the monthly draw to auto-select winners from scores
- Mark winners as Paid with one click

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router DOM, Axios, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose ODM) |
| Auth | JWT (JSON Web Tokens), bcryptjs |
| Styling | Custom CSS-in-JS (inline styles) |
| Fonts | Google Fonts — Playfair Display, DM Sans |

---

## 📁 Project Structure

```
golf-charity-app_Digital Heros/
│
├── frontend/                  # React app (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/
│   │   │   ├── Home.jsx       # Landing page
│   │   │   ├── Scores.jsx     # Player score tracking
│   │   │   └── Admin.jsx      # Admin dashboard
│   │   ├── App.jsx            # Routes configuration
│   │   ├── main.jsx           # App entry point
│   │   └── index.css          # Global styles
│   ├── index.html
│   └── package.json
│
├── backend/                   # Node.js + Express API
│   ├── config/                # DB connection config
│   ├── MiddleWare/            # Auth middleware (JWT)
│   ├── models/                # Mongoose schemas
│   │   ├── User.js
│   │   ├── Score.js
│   │   ├── Winner.js
│   │   ├── Charity.js
│   │   └── Draw.js
│   ├── Routes/                # API route handlers
│   │   ├── authRoutes.js      # Register / Login
│   │   └── scoreRoutes.js     # Score CRUD
│   ├── utils/
│   │   └── email.js           # Email notifications
│   ├── .env                   # Environment variables
│   └── server.js              # Express server entry
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or above)
- [npm](https://www.npmjs.com/)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/golf-charity-app.git
cd golf-charity-app
```

---

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/DigitalHeros?appName=Cluster0
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Start the backend server:

```bash
node server.js
```

You should see:
```
Server running on port 5000
DB Connected
```

---

### 3. Setup the Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at:
```
http://localhost:5173
```

---

### 4. You're all set! 🎉

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000 |
| Admin Panel | http://localhost:5173/admin |
| Scores Page | http://localhost:5173/scores |

---

## 🔐 Environment Variables

Create a `.env` file in the `/backend` directory with these variables:

| Variable | Description | Example |
|---|---|---|
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster...` |
| `JWT_SECRET` | Secret key for signing JWT tokens | `mySuperSecretKey123` |
| `PORT` | Port for the Express server | `5000` |

---

## 📡 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

### Score Routes — `/api/scores`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/scores` | Get all scores for logged-in user | ✅ |
| POST | `/api/scores` | Add a new score | ✅ |

### Admin Routes — `/api/admin`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/admin/users` | Get all registered users | ✅ Admin |
| GET | `/api/admin/winners` | Get all winners | ✅ Admin |
| GET | `/api/admin/stats` | Get dashboard stats | ✅ Admin |
| POST | `/api/admin/draw/run` | Run the monthly prize draw | ✅ Admin |
| PUT | `/api/admin/winners/:id/pay` | Mark a winner as paid | ✅ Admin |

---

## 📸 Screenshots

### 🏠 Home Page
> Beautiful dark-themed landing page with live leaderboard card, impact stats, and sponsor section.

### 🎯 Scores Page
> Player dashboard to add and track golf scores with real-time bar chart and performance labels.

### 🛠️ Admin Dashboard
> Sidebar-based admin panel with stats overview, user management, winners table, and monthly draw.

---

## ⚙️ How It Works

```
1. Player registers / logs in
        ↓
2. Player plays a round of golf
        ↓
3. Player adds their score on the Scores page
        ↓
4. Admin reviews all scores on the Admin panel
        ↓
5. Admin runs the Monthly Draw
        ↓
6. Winners are automatically selected based on scores
        ↓
7. Admin marks prize money as "Paid"
        ↓
8. Funds are donated to charity partners 🎗️
```

---

## 🎨 Design System

The app uses a consistent dark luxury theme across all pages:

| Element | Color |
|---|---|
| Background | `#0a0f0a` — Deep forest black |
| Primary Green | `#2d9e5f` — Golf green |
| Gold Accent | `#c9a84c` — Trophy gold |
| Danger | `#e05c6e` — Alert red |
| Text | `#f0f4f0` — Soft white |
| Muted Text | `#7a8f7a` — Sage grey |

Fonts: **Playfair Display** (headings) + **DM Sans** (body)

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

**Digital Heros Team**

> Built with ❤️ for charity. Every swing counts. 🏌️⛳
<img width="1920" height="923" alt="Screenshot (737)" src="https://github.com/user-attachments/assets/7c69f023-2914-4c74-a68d-e991aa3c211b" />
<img width="1920" height="1028" alt="Screenshot (740)" src="https://github.com/user-attachments/assets/fbd73eab-4a4d-48a6-8cfa-a1b696968e89" />
<img width="1920" height="874" alt="Screenshot (739)" src="https://github.com/user-attachments/assets/2841597c-f267-403b-9319-9791bbc4e104" />
<img width="1920" height="892" alt="Screenshot (738)" src="https://github.com/user-attachments/assets/e9deee98-81a4-4d54-9d97-96903209ed4b" />
