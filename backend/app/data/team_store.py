from fastapi import HTTPException, status

from app.schemas.team import TeamMember, TeamMemberCreate, TeamMemberUpdate


_team_members: list[TeamMember] = [
    TeamMember(
        id=1,
        name="Ayush Ranjan",
        role="Founding team",
        department="Armatrix",
        bio="Founding team member at Armatrix.",
        photo_url="/media/team/ayush-ranjan.jpg",
        linkedin="https://www.linkedin.com/in/ayush-ranjan-armatrix/",
    ),
    TeamMember(
        id=2,
        name="Prateesh Awasthi",
        role="Founding team",
        department="Armatrix",
        bio="Founding team member at Armatrix.",
        photo_url="/media/team/prateesh-awasthi.jpg",
        linkedin="https://www.linkedin.com/in/prateesh-awasthi-armatrix/",
    ),
    TeamMember(
        id=3,
        name="Vishrant Dave",
        role="Founding team",
        department="Armatrix",
        bio="Founding team member at Armatrix.",
        photo_url="/media/team/vishrant-dave.jpg",
        linkedin="https://www.linkedin.com/in/vishrant-dave-armatrix/",
    ),
    TeamMember(
        id=4,
        name="Co-founders",
        role="Founding team",
        department="Armatrix",
        bio="Armatrix founding team.",
        photo_url="/media/team/co-founders.jpeg",
        linkedin="https://www.linkedin.com/in/armatrix-founders/",
    ),
]


def list_team_members() -> list[TeamMember]:
    return _team_members


def get_team_member(member_id: int) -> TeamMember:
    member = next((item for item in _team_members if item.id == member_id), None)
    if member is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team member not found",
        )
    return member


def create_team_member(payload: TeamMemberCreate) -> TeamMember:
    next_id = max((member.id for member in _team_members), default=0) + 1
    team_member = TeamMember(id=next_id, **payload.model_dump())
    _team_members.append(team_member)
    return team_member


def update_team_member(member_id: int, payload: TeamMemberUpdate) -> TeamMember:
    for index, member in enumerate(_team_members):
        if member.id == member_id:
            updated_member = TeamMember(id=member_id, **payload.model_dump())
            _team_members[index] = updated_member
            return updated_member

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Team member not found",
    )


def delete_team_member(member_id: int) -> None:
    for index, member in enumerate(_team_members):
        if member.id == member_id:
            del _team_members[index]
            return

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Team member not found",
    )