from fastapi import FastAPI
from analyze.router import router as analyze_router

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex="http://localhost:[0-9]{4,5}",
    allow_credentials=True,
    allow_methods=[
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
    ],
    allow_headers=["*"]
)

app.include_router(
    analyze_router,
    prefix="/analyze",
    tags=["Analyze"],
)

@app.get("/")
async def root():
    return {
        "message": "hello worlds"
    }