# Obsyde

> A modern, full-stack task management application designed for efficiency and clarity.

Obsyde is a robust task management platform that allows users to organize their daily goals with priorities, due dates, and a clean, responsive user interface. Built with performance and user experience in mind, it features secure authentication and real-time updates.

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** JavaScript / React 19
- **Styling:** Tailwind CSS 4, Framer Motion
- **HTTP Client:** Axios
- **Icons:** Lucide React, React Icons
- **State/Feedback:** Sonner (Toast notifications)

### Backend
- **Framework:** Django 5.2
- **API:** Django REST Framework (DRF)
- **Authentication:** SimpleJWT (JWT-based auth with HttpOnly cookies)
- **Database:** PostgreSQL (Production), SQLite (Development)
- **Utilities:** Python Decouple, Pillow

### Deployment
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** Render PostgreSQL

## ✨ Features

- **User Authentication:** Secure registration and login with JWT (Access & Refresh tokens).
- **Task Management:** Create, read, update, and delete tasks.
- **Prioritization:** Assign Low, Medium, or High priority to tasks.
- **Due Dates:** Set and track deadlines for your tasks.
- **Responsive Design:** Fully responsive UI with a modern sidebar navigation.
- **Dark Mode:** Built-in dark mode support for visual comfort.
- **Profile Management:** User profile customization (Profile Picture).

## 📂 Folder Structure

```
todo_app/
├── backend/                # Django Backend
│   ├── backend/            # Project settings
│   ├── tasks/              # Task management app
│   ├── users/              # User authentication app
│   ├── templates/          # Django templates
│   ├── manage.py           # Django management script
│   └── requirements.txt    # Python dependencies
├── frontend/               # Next.js Frontend
│   ├── app/                # App Router pages & layouts
│   ├── components/         # Reusable UI components
│   ├── lib/                # Utilities (Axios, Auth)
│   ├── public/             # Static assets
│   └── package.json        # Node dependencies
└── README.md               # Project documentation
```

## 🚀 Setup & Installation

### Prerequisites
- Python 3.12+
- Node.js 18+
- npm or pnpm

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Apply database migrations:
   ```bash
   python manage.py migrate
   ```

5. Start the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

## ⚙️ Environment Variables

Create a `.env` file in the `backend/` directory and a `.env.local` file in the `frontend/` directory with the following variables:

### Backend (`backend/.env`)
```env
SECRET_KEY=your_secret_key_here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
DATABASE_URL=sqlite:///db.sqlite3 # Or your PostgreSQL URL
```

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

## 🔮 Future Roadmap

- [ ] Add task categories or tags for better organization.
- [ ] Implement drag-and-drop for task reordering.
- [ ] Add team collaboration features.
- [ ] Implement push notifications for due tasks.

## 📄 License

This project is licensed under the MIT License.