from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse

from app.api.routes.team import router as team_router


app = FastAPI(title="Team Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(team_router, tags=["team"])


@app.get("/", response_class=PlainTextResponse)
def read_root() -> str:
    return "API running"