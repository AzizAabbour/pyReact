import uuid
from datetime import datetime
from typing import Optional, Dict, Any
from pydantic import BaseModel, ConfigDict


class PromptBase(BaseModel):
    title: str
    description: Optional[str] = None
    framework: str
    prompt_type: str
    config: Dict[str, Any] = {}
    is_public: bool = False


class PromptCreate(PromptBase):
    pass


class PromptUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    framework: Optional[str] = None
    prompt_type: Optional[str] = None
    config: Optional[Dict[str, Any]] = None
    is_public: Optional[bool] = None


class PromptResponse(PromptBase):
    id: uuid.UUID
    creator_id: uuid.UUID
    content: str
    likes_count: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class PromptGenerateRequest(BaseModel):
    title: str
    description: Optional[str] = ""
    framework: str
    promptType: str
    dbType: Optional[str] = "None"
    authType: Optional[str] = "None"
    styleFramework: Optional[str] = "Tailwind CSS"
    features: Optional[str] = ""
    pages: Optional[str] = ""
