# Welcome to Remix with Docker + Postgres

This project is configured to run **Remix + Postgres** entirely inside Docker, both in development and production.  
You don’t need to install Node.js or Postgres locally — everything runs in containers.

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Environment variables

Create a `.env` file in the root of the project with:

App
NODE_ENV=development
PORT=3000

Database
POSTGRES_USER=remix
POSTGRES_PASSWORD=remix
POSTGRES_DB=remixdb

Prisma / Remix connection
DATABASE_URL=postgresql://remix:remix@db:5432/remixdb


> ⚠️ Note the host is `db`, which is the name of the Postgres service in `docker-compose.yml`.

---

## Development

Start everything (app + database) in development mode:

`npm run docker:up`

- The Remix dev server will run inside Docker at  
  [http://localhost:5173](http://localhost:5173) (hot-reload enabled).  
- Postgres will be available at `localhost:5434`.  

Stop everything and remove volumes/containers:

`npm run docker:down`

---

## Database commands

All Prisma commands are already wrapped with Docker Compose:

- Run migrations:

`npm run db:migrate`

- Generate Prisma client:

`npm run db:generate`

- Open Prisma Studio:

`npm run db:studio`

---

## Production

To build and run in production mode:

NODE_ENV=production npm run docker:up

- The Remix app will build and run on port `3000`  
  → [http://localhost:3000](http://localhost:3000)  
- Postgres stays on `localhost:5434`.

---

## How it works

- **Dockerfile**:  
  - Uses Node.js 20  
  - Installs dependencies  
  - Runs `prisma generate`  
  - In **production**, it builds Remix and runs `npm start` on port `3000`.  
  - In **development**, it runs `npm run dev` on port `5173`.

- **docker-compose.yml**:  
  - **db**: Postgres 14 with persistent volume  
  - **app**: Remix application, mapped with volumes for hot reload in dev, connected to the database  

---

## Quick reference

- Dev app: [http://localhost:5173](http://localhost:5173)  
- Prod app: [http://localhost:3000](http://localhost:3000)  
- Postgres: `localhost:5434`  
- Database URL inside app:  
postgresql://remix:remix@db:5432/remixdb
