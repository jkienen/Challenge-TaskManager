/ --------------------------------------------------------------------------------------------------------------------- /

- Project: Challenge-TaskManager
- Creation Date: 01/04/2026

---

## ⚙️ Technical Reasoning (Summary)

- **`Next.js`** used in the frontend allows easy integration with the backend and enables server-side rendering (SSR/SSG), ensuring better performance and SEO.
- **`FastAPI`** chosen for the backend due to its high performance, easy integration with Python tools, automatic API documentation, and support for asynchronous operations, making it ideal for modern web APIs.  
- **`SQLite`** used to store data, sufficient for the challenge, avoiding unnecessary complexity.  
- **`Docker Compose`** used for deploying the environments, configured to ensure isolation between backend and frontend.  
- **`Automated tests`** used to validate functionality before frontend integration, with pytest/TestClient ensuring correct endpoint behavior.  

---

## ⚙️ Backend Endpoints Structure

**`/Datas`**      -> Contains the SQLite database.  
**`/Endpoints`**  -> Contains the API routes: GET /tasks, POST /tasks, PUT /tasks/{id}, DELETE /tasks/{id}  
**`/Models`**     -> Defines the data models used in request bodies and responses, and contains the database fields.  
**`/Services`**   -> Contains the task logic used by the API routes.  
**`/tests`**      -> Contains automated backend tests.  
**`config.py`**   -> General backend configuration.  
**`main.py`**     -> Validates if the database exists and starts the backend server.  

---

## ⚙️ Docker File Structure

Below are the main files that compose the Docker environment for the backend and frontend:

- 📄 **`docker-compose.yml`**  
  Main file that defines:
  - Backend (FastAPI) and Frontend (Next.js) services  
  - Docker images used for each service  
  - Environment variables for each container  
  - Ports exposed for external access  
  - Internal network for service communication  

- 🐳 **`Dockerfile`**  
  Files responsible for defining each application's Docker image:
  
  Backend:
    - Uses a Python base image  
    - Automatically installs dependencies via requirements.txt  
    - Runs FastAPI server via Uvicorn  

  Frontend:
    - Uses a Node.js base image  
    - Installs dependencies via package.json  
    - Builds and runs the Next.js application  

---

## ⚙️ Docker Compose Commands

**`Execution Instructions (Production)`**

- `docker compose up --build -d`  
  Starts the container based on the Dockerfile (in background).

- `docker compose restart`  
  Restarts the container without deleting data.

- `docker compose stop`  
  Stops the container without deleting data.

- `docker compose down`  
  Removes the container.

**`Execution Instructions (Backend Tests)`**

- `docker compose run --rm backend pytest -v`  
  Launches an isolated container for automated tests and removes it after completion.

**`Execution Instructions (Investigation and Debug)`**

- `docker compose ps`  
  Validate active containers.

- `docker compose logs -f backend`  
  Check backend logs.

- `docker compose logs -f frontend`  
  Check frontend logs.

/ --------------------------------------------------------------------------------------------------------------------- /
