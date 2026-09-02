# AGENTS.md

## Project overview

This repo contains a small full-stack product app:

- Backend: Spring Boot 4, Java 25, PostgreSQL, Liquibase, Spring Data JPA
- Frontend: React 18.3.1, TypeScript, Vite
- Local database: PostgreSQL running on the host machine, not in Docker

## Repository layout

- backend/ — Spring Boot API
- frontend/ — React + TypeScript UI
- README.md — project setup and run instructions

## Core conventions

- Do not add Docker-based database setup for this project.
- Liquibase owns schema creation and migrations.
- Keep the frontend organized into small reusable components.
- Prefer TypeScript and readable component composition over large monolithic files.
- Keep tests focused on real behavior, not implementation details.

## Local database setup

Start PostgreSQL using the normal service method for the host OS:

- macOS: `brew services start postgresql`
- Linux: use your systems service manager, for example `sudo service postgresql start` or `sudo systemctl start postgresql`
- Windows: start the PostgreSQL service from Services or the PostgreSQL startup utility

Once PostgreSQL is running, create the database and role used by the app:

```sql
CREATE DATABASE postgres;
CREATE USER backend_user WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE postgres TO backend_user;
GRANT ALL ON SCHEMA public TO backend_user;
```

The app expects:

- database: postgres
- username: backend_user
- password: postgres

## Backend startup

From the repo root:

```bash
cd backend
mvn spring-boot:run
```

Expected app URL:

- http://localhost:8081

Swagger UI:

- http://localhost:8081/swagger-ui/index.html

## Frontend startup

From the repo root:

```bash
cd frontend
npm install
npm run dev
```

Expected app URL:

- http://localhost:5173

The frontend proxies `/api` requests to the backend on port 8081.

## Testing

Backend tests:

```bash
cd backend
mvn test
```

Frontend tests:

```bash
cd frontend
npm run test
```

## Useful notes

- Keep generated build output out of Git tracking.
- The `backend/target` folder is build output and should not be edited manually.
- Prefer small components for card/container, form, and list UI sections.
- Keep the README current with the actual running setup of the project.
