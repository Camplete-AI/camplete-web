#!/bin/sh
set -e

if [ "$NODE_ENV" = "production" ]; then
  echo "➡️ Running Prisma migrations..."
  npx prisma migrate deploy --schema=prisma-backend/prisma/schema.prisma

  echo "➡️ Building app..."
  npm run build

  echo "➡️ Starting server..."
  exec npm run start -- --host 0.0.0.0 --port ${PORT:-3000}
else
  echo "➡️ Starting in dev mode..."
  exec npm run dev -- --host 0.0.0.0 --port 5173
fi
