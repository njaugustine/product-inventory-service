# Products App

A small full-stack product management application built with a Spring Boot backend and a React + TypeScript frontend.

## Prerequisites

- Java 25
- Maven 3.9+
- PostgreSQL 17 locally installed and running
- Node.js 18+ and npm
- React 18.3.1

## Local database setup

This project uses a local PostgreSQL instance instead of Docker.

1. Start PostgreSQL locally using the method appropriate for your operating system.
   - macOS: `brew services start postgresql`
   - Linux: use your system service manager (for example `sudo service postgresql start` or `sudo systemctl start postgresql`)
   - Windows: start the PostgreSQL service from Services or use the installed PostgreSQL startup utility
2. Create a database named `postgres`.
3. Create a role/user named `backend_user` with password `postgres`.
4. Grant the user access to the database and schema.

Example:

```sql
CREATE DATABASE postgres;
CREATE USER backend_user WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE postgres TO backend_user;
GRANT ALL ON SCHEMA public TO backend_user;
```

Liquibase runs on application startup and creates the `products` table automatically.

## Backend startup

From the backend folder:

```bash
cd backend
mvn spring-boot:run
```

The API runs on:

- http://localhost:8081

Swagger UI is available at:

- http://localhost:8081/swagger-ui/index.html

## Frontend startup

From the frontend folder:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

- http://localhost:5173

It proxies API calls to the backend at `http://localhost:8081`.

## Backend tests

From the backend folder:

```bash
cd backend
mvn test
```

## Frontend tests

From the frontend folder:

```bash
cd frontend
npm run test
```

## API usage

List products:

```bash
curl http://localhost:8081/api/products
```

Create a product:

```bash
curl -X POST http://localhost:8081/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Hammer"}'
```

## Project structure

- Backend: Spring Boot, Java, PostgreSQL, Liquibase, JPA
- Frontend: React, TypeScript, Vite
- Testing: JUnit + Mockito on the backend, Jest + React Testing Library on the frontend

## Notes

- The app intentionally keeps the CRUD surface small and focused.
- Database schema changes are managed by Liquibase instead of Hibernate `ddl-auto`.
- The frontend and backend are intentionally separated to keep the project easier to reason about and extend.
