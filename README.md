# armatrix-team-page

Full-stack starter with a FastAPI backend and a Next.js frontend.

## Project structure

- `backend/`: FastAPI API with CORS enabled and starter team routes
- `frontend/`: Next.js App Router app with TypeScript, Tailwind CSS, and Axios

## Backend setup

Install dependencies:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

Run the API:

```bash
cd backend
uvicorn main:app --reload
```

Available endpoints:

- `GET /` returns `API running`
- `GET /team` returns all team members
- `GET /team/{id}` returns one team member
- `POST /team` creates a team member
- `PUT /team/{id}` updates a team member
- `DELETE /team/{id}` deletes a team member

## Frontend setup

Install dependencies:

```bash
cd frontend
npm install
```

Run the app:

```bash
cd frontend
npm run dev
```

The team page is available at `http://localhost:3000/team` and fetches data from `http://localhost:8000/team`.

## Local development

Start the backend first, then start the frontend in a separate terminal.

1. `cd backend` and run `uvicorn main:app --reload`
2. `cd frontend` and run `npm run dev`

## Deployment (recommended)

This repo is easiest to deploy as two services:

### 1) Deploy the frontend (Next.js) on Vercel

- Import the GitHub repo in Vercel.
- Set **Root Directory** to `frontend`.
- Add env var:
	- `NEXT_PUBLIC_API_BASE_URL` = your backend URL (example: `https://armatrix-api.onrender.com`)

### 2) Deploy the backend (FastAPI) on Render/Railway/Fly

- Service root: `backend`
- Install command: `pip install -r requirements.txt`
- Start command (example): `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Add env var:
	- `CORS_ORIGINS` = comma-separated list of allowed frontend origins
		- example: `https://your-vercel-app.vercel.app,https://your-domain.com`

Notes:
- If you set `CORS_ORIGINS=*`, credentials are disabled automatically.
- After both are deployed, open the frontend URL and verify `/team` loads data.
