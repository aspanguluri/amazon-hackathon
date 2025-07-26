from fastapi import FastAPI, APIRouter

router = APIRouter()


@router.get("/")
async def analyze():
    return {
        "message": "Analysis complete"
    }