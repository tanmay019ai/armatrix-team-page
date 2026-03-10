from pydantic import BaseModel


class TeamMemberBase(BaseModel):
    name: str
    role: str
    department: str
    bio: str
    photo_url: str
    linkedin: str


class TeamMemberCreate(TeamMemberBase):
    pass


class TeamMemberUpdate(TeamMemberBase):
    pass


class TeamMember(TeamMemberBase):
    id: int


class MessageResponse(BaseModel):
    message: str