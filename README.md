# Eswar Nexus

> **Eswar Nexus is a comprehensive, modern digital ecosystem designed for Eswar College of Engineering. It seamlessly bridges the official public-facing institutional website with a powerful, AI-driven Student ERP portal.**

Designed to replace fragmented college systems and dated web pages with a single, highly polished, software-first platform. It features a unique hybrid design system: a bright, spacious **Premium Institutional Light Theme** for the public homepage, and an immersive **Premium Soft Dark Theme** for the secure Student ERP Dashboard.

---

## 🌟 Key Features

### 1. The Official Institutional Homepage
A completely redesigned, ultra-premium Light Theme landing page that authentically represents Eswar College.
- **Accreditation Header**: Official AICTE, JNTUK, and NAAC B++ badging.
- **Dynamic Event Ticker & News**: Scrolling updates and highlights for workshops and campus events.
- **Campus & Academic Integration**: Showcasing B.Tech departments, campus infrastructure, and official "About HEI" details.
- **Placement Marquee**: Highlighting top recruiters like TCS, Infosys, Wipro, and Capgemini.

### 2. The Intelligence Dashboard (ERP)
A centralized, dark-mode hub providing an immediate overview of a student's academic standing.
- **Academic Health Score**: Real-time calculation based on attendance, GPA, and pending tasks.
- **Student Timeline**: A modern activity feed tracking assignment submissions, fee payments, and placement applications.
- **Apple Wallet Digital ID**: A beautifully styled, verifiable digital student ID with a scannable QR code.

### 3. Placement Eligibility Engine
A proactive career platform built directly into the ERP.
- **Automated Eligibility**: The engine checks GPA, attendance, and backlogs to determine eligibility for upcoming recruitment drives.
- **ATS Resume UI**: Upload a resume and instantly receive an AI-mocked ATS score, skill match percentage, and readability feedback.

### 4. Secure Fee Management
A realistic transactional workflow.
- **Analytics**: Clear breakdown of Semester Fee, Total Paid, and Due Amount.
- **Payment Gateway UI**: A beautifully mocked checkout flow featuring 256-bit AES encryption messaging and success animations.

### 5. Eswar AI Core Assistant
A dedicated, full-screen conversational interface built into the student portal.
- **Career Coach**: Ask questions like *"Which skills should I learn?"* or *"Am I placement eligible?"*
- **Ambient UI**: Features a massive, animated "breathing" orb and mesh gradients for a premium AI feel.

---

## 🏗 Architecture & Tech Stack

**Frontend (Client)**
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS 
- **Design System**: Hybrid (Bright Clean Light Mode for Landing Page / Dark Glassmorphism for ERP Dashboard)
- **Animations**: Framer Motion (Spring physics, route transitions)
- **Data Visualization**: Recharts
- **Icons**: Lucide React

**Backend (Server)**
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JWT (JSON Web Tokens) & Google OAuth
- **AI Integration**: Google Gemini AI (via API)

---

## 🚀 Quick Setup Guide

### 1. Clone & Install
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Variables
Create a `.env` file in the `/backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/eswar-nexus
JWT_SECRET=your_jwt_secret_key_here
GEMINI_API_KEY=your_gemini_api_key_here
GOOGLE_CLIENT_ID=your_google_client_id_here
```

### 3. Run the Application
Start both the server and the client:
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 🧪 Recruiter Demo Flow

The application comes pre-configured with **One-Click Demo Accounts** on the Login page to make testing effortless.

**Recommended 5-Minute Demo Sequence:**
1. View the newly redesigned **Official Institutional Homepage** (Light Theme) showcasing the college's scale and accreditations.
2. Click **Login** (opens in a new tab) and use the **Student Demo** one-click access.
3. Review the **Student Dashboard** (Health Score, Timeline, Digital ID) in the premium dark theme.
4. Navigate to **Placements** to see the Eligibility Engine and Resume Score UI.
5. Navigate to **Payments** and initiate a mock ₹15,000 transaction.
6. Open the **Eswar AI Core** via the sidebar for the full-screen AI experience.

---

*Designed and engineered with a focus on product maturity, clean UX, and believable institutional workflows.*
