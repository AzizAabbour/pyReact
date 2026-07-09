from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1 import auth, prompts, users
from app.db.session import engine
from app.db.base import Base
from app.models import user, prompt, category  # Import models to ensure they register on Base

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)

# CORS middleware config
app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(origin).rstrip("/") for origin in settings.CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_db_tables():
    # Automatically build table objects if they don't exist in SQLAlchemy registry
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


# Include api routers
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["Authentication"])
app.include_router(prompts.router, prefix=f"{settings.API_V1_STR}/prompts", tags=["Prompts"])
app.include_router(users.router, prefix=f"{settings.API_V1_STR}/users", tags=["Users"])


@app.get("/")
def check_health():
    return {"status": "ok", "app": settings.APP_NAME, "version": settings.APP_VERSION}
