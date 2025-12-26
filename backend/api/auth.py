from fastapi import APIRouter, Depends, HTTPException, status, Body
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from datetime import timedelta
from jose import JWTError
from ..database import engine
from ..models import User
from ..schemas import (
    Token, UserCreate, UserRead, CaptchaResponse,
    PasswordResetRequest, PasswordResetConfirm
)
from ..utils import (
    hash_password, verify_password, create_access_token,
    generate_captcha, generate_captcha_image, validate_captcha
)
import secrets

router = APIRouter()

@router.post("/captcha", response_model=CaptchaResponse)
def get_captcha():
    captcha_id, code = generate_captcha()
    image_b64 = generate_captcha_image(code)
    return {"captcha_id": captcha_id, "image": image_b64}

@router.post("/register", response_model=UserRead)
def register(user: UserCreate, session: Session = Depends(lambda: Session(engine))):
    # 检查用户名/邮箱是否已存在
    existing = session.exec(select(User).where((User.username == user.username) | (User.email == user.email))).first()
    if existing:
        raise HTTPException(status_code=400, detail="用户名或邮箱已存在")
    db_user = User(
        username=user.username,
        email=user.email,
        password_hash=hash_password(user.password),
        role="user"
    )
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    captcha_id: str = Body(...),
    captcha: str = Body(...)
):
    if not validate_captcha(captcha_id, captcha):
        raise HTTPException(status_code=400, detail="验证码错误")

    with Session(engine) as session:
        user = session.exec(select(User).where(User.username == form_data.username)).first()
        if not user or not verify_password(form_data.password, user.password_hash) or not user.is_active:
            raise HTTPException(status_code=401, detail="用户名或密码错误")

        access_token = create_access_token(
            data={"sub": user.username, "role": user.role},
            expires_delta=timedelta(minutes=30)
        )
        return {"access_token": access_token, "token_type": "bearer"}

# TODO: 忘记密码（简化版 - 实际应发邮件）
@router.post("/password-reset/request")
def request_password_reset(request: PasswordResetRequest):
    # 此处应发送邮件，这里仅返回 token（演示用）
    fake_token = secrets.token_urlsafe(32)
    print(f"[DEBUG] Password reset token for {request.email}: {fake_token}")
    return {"message": "重置链接已发送至邮箱（演示模式）"}

@router.post("/password-reset/confirm")
def confirm_password_reset(confirm: PasswordResetConfirm, session: Session = Depends(lambda: Session(engine))):
    # 实际应验证 token 有效性
    user = session.exec(select(User).where(User.email == "demo@example.com")).first()  # 演示
    if not user:
        raise HTTPException(status_code=404, detail="用户不存在")
    user.password_hash = hash_password(confirm.new_password)
    session.add(user)
    session.commit()
    return {"message": "密码已重置"}
