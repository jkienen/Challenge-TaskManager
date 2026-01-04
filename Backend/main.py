# Import modules
import sqlite3
from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

from config import DB_PATH
from Endpoints import routes as routes


# ---> Getting functions

# -> Init Database
def Init():
    """Query to start Database"""
    try:
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS tasks (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    description TEXT,
                    status TEXT,
                    created TEXT DEFAULT (DATE('now'))
                )
            """)
            conn.commit()
            return True
    except Exception as e: print(e); return False
# ->

# --->


# ---> Load FastAPI

# -> Check status Init Database
@asynccontextmanager
async def lifespan(app: FastAPI):
    if not Init():
        raise RuntimeError("Failed to initialize the database. API stopped.")
    yield
# -> 

app = FastAPI(
    lifespan=lifespan, 
    title="Tasks API", description="API to manage custom tasks: create, update, list, and delete tasks easily and efficiently.", version="1.0.0", 
    docs_url="/", redoc_url=None
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Content-Type"],
)
app.include_router(routes.router)
# --->