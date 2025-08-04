# 📋 Incident Management App

## 🚀 How to Run

### Install all dependencies
```bash
npm install
```

### ▶️ Backend

```bash
npm run dev:backend
```

Runs the Node.js + Express + Sequelize backend on [http://localhost:4000](http://localhost:4000).

---

### 💻 Frontend

```bash
npm run dev:frontend
```

Runs the Next.js + Tailwind frontend on [http://localhost:3000](http://localhost:3000).

---

## 🔐 Firebase Setup & .env Configuration

### 1. Firebase Project

- Go to [https://console.firebase.google.com](https://console.firebase.google.com)
- Create a new project
- Enable **Authentication** → Providers → enable **Email/Password**

---

### 2. Service Account (for backend)

- Go to **Project Settings** → **Service accounts**
- Click **Generate new private key** and download it

Use the following in `backend/.env`:

```env
# Server
PORT=4000

# PostgreSQL Database
DB_HOST=localhost
DB_USER=postgres
DB_PASS=mysecurepassword
DB_NAME=incident_db

# Firebase Admin SDK
FIREBASE_PROJECT_ID=incident-management-4f6e7
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-abc12@incident-management-4f6e7.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASC...\\nabc123XYZ=\\n-----END PRIVATE KEY-----\\n"

# Firebase Client SDK (Testing)
TEST_FIREBASE_API_KEY=AIzaSyABC123-FakeKeyForTesting-XYZ987
TEST_FIREBASE_EMAIL=testuser@yopmail.com
TEST_FIREBASE_PASSWORD=Testuser123
TEST_FIREBASE_UID=123456789abcdefg

# OpenAI
OPENAI_API_KEY=sk-fake-openai-key-1234567890abcdef
```

---

### 3. Firebase Config (for frontend)

Use the Firebase Web SDK config in `frontend/.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
```

---

## 🧪 Running Tests

### Backend

```bash
cd backend
npm run test
```

Runs Jest + Supertest-based API tests.