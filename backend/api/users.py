from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from ..database import engine
from ..models import User
from ..schemas import UserRead, UserUpdate
from ..utils import hash_password
from typing import List
from ..schemas import UserRead

router = APIRouter()

def get_current_user(token: str = Depends(lambda x: x)):  # 简化，实际应解析 JWT
    # 演示：假设当前用户是 admin
    return {"username": "admin", "role": "admin"}

def require_admin(current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="需要管理员权限")

@router.get("/users", response_model=List[UserRead])  # ✅ 关键：必须是 List[UserRead]（大写L）
def list_users(session: Session = Depends(lambda: Session(engine)), _=Depends(require_admin)):
    users = session.exec(select(User)).all()
    return users

@router.put("/users/{user_id}", response_model=UserRead)
def update_user(user_id: int, update: UserUpdate, session: Session = Depends(lambda: Session(engine)), _=Depends(require_admin)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="用户不存在")
    if update.email:
        user.email = update.email
    if update.password:
        user.password_hash = hash_password(update.password)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user