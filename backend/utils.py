import secrets
import string
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from PIL import Image, ImageDraw, ImageFont
import io
import base64

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    # 确保密码不超过72字节（bcrypt限制）
    if len(password.encode('utf-8')) > 72:
        password = password[:72]
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = None, secret_key: str = "your-secret-key-change-in-production") -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, secret_key, algorithm="HS256")

# 简易验证码（内存存储）
CAPTCHA_STORE = {}

def generate_captcha():
    captcha_id = secrets.token_urlsafe(16)
    code = ''.join(secrets.choice(string.ascii_uppercase + string.digits) for _ in range(4))
    CAPTCHA_STORE[captcha_id] = code.lower()
    # 清理过期（简单处理）
    if len(CAPTCHA_STORE) > 1000:
        CAPTCHA_STORE.clear()
    return captcha_id, code

def validate_captcha(captcha_id: str, user_input: str) -> bool:
    expected = CAPTCHA_STORE.get(captcha_id)
    if expected and expected == user_input.lower():
        CAPTCHA_STORE.pop(captcha_id, None)
        return True
    return False

def generate_captcha_image(code: str) -> str:
    img = Image.new('RGB', (120, 40), color=(255, 255, 255))
    d = ImageDraw.Draw(img)
    try:
        # 尝试使用系统字体
        from PIL import ImageFont
        font = ImageFont.truetype("arial.ttf", 30)
    except:
        font = ImageFont.load_default()
    d.text((10, 5), code, fill=(0, 0, 0), font=font)
    buffered = io.BytesIO()
    img.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode()
