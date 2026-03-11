# Armatrix Team Page

Full-stack project built with **Next.js (frontend)** and **FastAPI (backend)** to implement a dynamic Team Page.

## Tech Stack
Frontend:
- Next.js
- React
- Tailwind CSS
- Axios

Backend:
- FastAPI
- Python
- Pydantic

Deployment:
- Frontend: Vercel
- Backend: Render

## Features
- Dynamic team member data fetched from backend API
- CRUD endpoints for managing team members
- Responsive UI
- Clean full-stack architecture

## Running Locally

### Backend
cd backend  
pip install -r requirements.txt  
uvicorn main:app --reload  

API runs at:
http://localhost:8000

### Frontend
cd frontend  
npm install  
npm run dev  

App runs at:
http://localhost:3000/

## API Endpoints

GET /team  
POST /team  
PUT /team/{id}  
DELETE /team/{id}

## Live Deployment

Frontend  
https://armatrix-team-page-three.vercel.app/

Backend  
https://armatrix-team-page.onrender.com/
