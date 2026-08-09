from pydantic import BaseModel, EmailStr, ConfigDict,Field


class UserCreate(BaseModel):
    name: str = Field(..., min_length=1)
    email: EmailStr
    password: str = Field(..., min_length=6)

class UserUpdate(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    password: str | None = None


class UserResponse(BaseModel):
    user_id: int
    name: str
    email: EmailStr

    model_config = ConfigDict(from_attributes=True)