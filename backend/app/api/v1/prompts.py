import uuid
from typing import Any, List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.api import deps
from app.db.session import get_db
from app.models.prompt import Prompt
from app.models.user import User
from app.schemas.prompt import PromptCreate, PromptResponse, PromptGenerateRequest

router = APIRouter()


def generate_structured_content(data: PromptGenerateRequest) -> str:
    # Rich AI structural prompt blueprint template generator
    return f"""# Project Overview: {data.title}

## 1. Objectives & Scope
Design and develop a high-performance {data.framework} application utilizing {data.styleFramework} and {data.dbType} for database persistence. The target system must support secure access protocols through {data.authType}.

## 2. Tech Stack Parameters
- **Frontend Core**: {data.framework} (ES2024 / Latest)
- **Styling Layout**: {data.styleFramework} (responsive fluid containers, custom variables)
- **Database Layer**: {data.dbType}
- **Authentication Handlers**: {data.authType}
- **Primary Icons**: Lucide React Icons

## 3. UI Design System & Theme Colors
- Dark Mode Background: #0F172A (Slate 900)
- Light Mode Background: #F8FAFC (Slate 50)
- Brand Primary Tint: #4F46E5 (Indigo 600)
- Brand Secondary Tint: #06B6D4 (Cyan 500)
- Accent Highlight: #8B5CF6 (Violet 500)
- Border Spacing: 1px solid var(--border-glass)
- Rounded Corner Radius: xl (16px)

## 4. Application Pages & Route Map
{chr(10).join([f"- **{p.strip()} Page**: Configured as a responsive grid view." for p in data.pages.split(',') if p.strip()])}

## 5. Main Features & Functionality
{chr(10).join([f"- **{f.strip()}**: Integrated system modules." for f in data.features.split(',') if f.strip()]) if data.features else "- Custom UI controls integration\\n- Real-time page transitions"}

## 6. Database Models & SQL Tables Setup
```sql
-- PostgreSQL / Relational Script
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    action_type VARCHAR(50) NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## 7. API Routing Interfaces
- `POST /api/v1/auth/login` - Authenticate users and yield JWT tokens.
- `POST /api/v1/auth/register` - Create new user profile credentials.
- `GET /api/v1/items` - Paginate list records with filters.

## 8. Best Practices, Security & SEO
- **SEO Elements**: Include meta-description index headers and clean heading tags hierarchy.
- **Accessibility rules**: Adhere to WCAG AAA contrast controls and complete aria-labels.
- **Security parameters**: Escape raw parameters to avoid SQL injections; enforce JWT token refresh rules.
"""


@router.post("/generate")
async def generate_prompt(
    data: PromptGenerateRequest,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    # Create prompt content from template builder
    content = generate_structured_content(data)
    return {
        "title": data.title,
        "framework": data.framework,
        "prompt_type": data.promptType,
        "content": content,
        "config": data.model_dump()
    }


@router.post("", response_model=PromptResponse)
async def save_prompt(
    prompt_in: PromptCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    content = generate_structured_content(
        PromptGenerateRequest(
            title=prompt_in.title,
            framework=prompt_in.framework,
            promptType=prompt_in.prompt_type,
            pages=prompt_in.config.get("pages", ""),
            features=prompt_in.config.get("features", ""),
            dbType=prompt_in.config.get("dbType", "None"),
            authType=prompt_in.config.get("authType", "None"),
        )
    )
    db_prompt = Prompt(
        creator_id=current_user.id,
        title=prompt_in.title,
        description=prompt_in.description,
        content=content,
        framework=prompt_in.framework,
        prompt_type=prompt_in.prompt_type,
        config=prompt_in.config,
        is_public=prompt_in.is_public
    )
    db.add(db_prompt)
    await db.flush()
    return db_prompt


@router.get("", response_model=List[PromptResponse])
async def list_my_prompts(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    query = select(Prompt).where(Prompt.creator_id == current_user.id)
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/explore", response_model=List[PromptResponse])
async def list_public_prompts(
    db: AsyncSession = Depends(get_db)
) -> Any:
    query = select(Prompt).where(Prompt.is_public == True)
    result = await db.execute(query)
    return result.scalars().all()
