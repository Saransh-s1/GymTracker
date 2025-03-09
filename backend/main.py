from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from gyms import run

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to ["http://your-local-ip:3000"] for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/gyms")
async def get_gyms():
    gyms = run()
    return gyms


