# Prisma Commands

## Setup

- `createdb Camplete AI`
- `npx prisma migrate dev --name init --schema=prisma-backend/prisma/schema.prisma`
- `npx prisma generate --schema=prisma-backend/prisma/schema.prisma`

## Atualizações de schema

- `npx prisma migrate dev --name minha-alteracao --schema=...`
- `npx prisma generate --schema=...`

## Visualização e status

- `npx prisma studio --schema=...`
- `npx prisma migrate status --schema=...`
