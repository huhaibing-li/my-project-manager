from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    username: str = Field(unique=True, max_length=50)
    email: str = Field(unique=True, max_length=100)
    password_hash: str
    role: str = Field(default="user")  # "admin" or "user"
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Project(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    project_code: str
    project_name: str
    client_name: str
    project_type: str
    manager: str
    start_date: str
    end_date: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
