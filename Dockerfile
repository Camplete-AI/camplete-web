FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate --schema=prisma-backend/prisma/schema.prisma

EXPOSE 3000
EXPOSE 5173

ENTRYPOINT ["sh", "./docker-entrypoint.sh"]
