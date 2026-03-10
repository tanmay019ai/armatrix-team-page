from fastapi import HTTPException, status

from app.schemas.team import TeamMember, TeamMemberCreate, TeamMemberUpdate


_team_members: list[TeamMember] = [
    TeamMember(
        id=1,
        name="Ava Carter",
        role="Engineering Lead",
        department="Platform",
        bio="Leads platform strategy and helps teams deliver reliable internal tools.",
        photo_url="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
        linkedin="https://www.linkedin.com/in/ava-carter",
    ),
    TeamMember(
        id=2,
        name="Noah Patel",
        role="Frontend Engineer",
        department="Product Engineering",
        bio="Builds accessible user interfaces and owns the team page experience.",
        photo_url="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
        linkedin="https://www.linkedin.com/in/noah-patel",
    ),
    TeamMember(
        id=3,
        name="Mia Thompson",
        role="Backend Engineer",
        department="Core Services",
        bio="Designs API workflows and keeps service contracts clean and stable.",
        photo_url="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80",
        linkedin="https://www.linkedin.com/in/mia-thompson",
    ),
    TeamMember(
        id=4,
        name="Liam Chen",
        role="Product Designer",
        department="Design",
        bio="Turns product requirements into usable systems with a strong visual language.",
        photo_url="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
        linkedin="https://www.linkedin.com/in/liam-chen",
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