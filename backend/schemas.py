from pydantic import BaseModel, EmailStr
from typing import List, Optional

class Token(BaseModel):
    access_token: str
    token_type: str

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: int
    role: str
    is_active: bool

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    password: Optional[str] = None

class ProjectCreate(BaseModel):
    project_code: str
    project_name: str
    client_name: str
    project_type: str
    manager: str
    start_date: str
    end_date: str

class ProjectRead(ProjectCreate):
    id: int

class ProjectListResponse(BaseModel):
    total: int
    data: List[ProjectRead]

class CaptchaResponse(BaseModel):
    captcha_id: str
    image: str  # base64

class PasswordResetRequest(BaseModel):
    email: EmailStr

class PasswordResetConfirm(BaseModel):
    token: str
    new_password: str

__all__ = ["UserBase", "UserCreate", "UserRead"]