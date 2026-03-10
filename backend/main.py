import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse

from app.api.routes.team import router as team_router


app = FastAPI(title="Team Management API")


def parse_cors_origins(value: str | None) -> list[str]:
    if not value:
        return ["http://localhost:3000"]

    origins = [item.strip() for item in value.split(",") if item.strip()]
    return origins or ["http://localhost:3000"]


cors_origins = parse_cors_origins(os.getenv("CORS_ORIGINS"))
allow_all_origins = "*" in cors_origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if allow_all_origins else cors_origins,
    allow_credentials=False if allow_all_origins else True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(team_router, tags=["team"])


@app.get("/", response_class=PlainTextResponse)
def read_root() -> str:
    return "API running"