# Import modules
from pydantic import BaseModel


# ---> Load Models
class Task(BaseModel):
    name: str
    description: str
    status: str
# --->