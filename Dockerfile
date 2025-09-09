FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate --schema=prisma-backend/prisma/schema.prisma

EXPOSE 3000
EXPOSE 5173

CMD if [ "$NODE_ENV" = "production" ]; then \
      npm run build && npm run start -- --host 0.0.0.0 --port ${PORT:-3000}; \
    else \
      npm run dev -- --host 0.0.0.0 --port 5173; \
    fi
