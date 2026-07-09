from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.api import deps
from app.db.session import get_db
from app.models.user import User
from app.schemas.user import UserResponse, UserUpdate

router = APIRouter()


@router.get("/me", response_model=UserResponse)
async def get_current_profile(
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    return current_user


@router.put("/me", response_model=UserResponse)
async def update_profile(
    profile_in: UserUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    if profile_in.username is not None:
        current_user.username = profile_in.username
    if profile_in.email is not None:
        # Check if email is already taken
        email_query = select(User).where(User.email == profile_in.email)
        res = await db.execute(email_query)
        conflict = res.scalar_one_or_none()
        if conflict and conflict.id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already in use."
            )
        current_user.email = profile_in.email
    if profile_in.avatar_url is not None:
        current_user.avatar_url = profile_in.avatar_url
        
    db.add(current_user)
    return current_user
