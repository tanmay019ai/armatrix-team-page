from fastapi import APIRouter, status

from app.data.team_store import (
    create_team_member,
    delete_team_member,
    get_team_member,
    list_team_members,
    update_team_member,
)
from app.schemas.team import MessageResponse, TeamMember, TeamMemberCreate, TeamMemberUpdate


router = APIRouter(prefix="/team", tags=["team"])


@router.get("", response_model=list[TeamMember])
def get_team_members() -> list[TeamMember]:
    return list_team_members()


@router.get("/{member_id}", response_model=TeamMember)
def get_team_member_by_id(member_id: int) -> TeamMember:
    return get_team_member(member_id)


@router.post("", response_model=TeamMember, status_code=status.HTTP_201_CREATED)
def create_team_member_route(payload: TeamMemberCreate) -> TeamMember:
    return create_team_member(payload)


@router.put("/{member_id}", response_model=TeamMember)
def update_team_member_route(member_id: int, payload: TeamMemberUpdate) -> TeamMember:
    return update_team_member(member_id, payload)


@router.delete("/{member_id}", response_model=MessageResponse)
def delete_team_member_route(member_id: int) -> MessageResponse:
    delete_team_member(member_id)
    return MessageResponse(message="Team member deleted")