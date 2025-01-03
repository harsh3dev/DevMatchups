# Dockerfile
FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY prisma ./prisma/
COPY package*.json ./
COPY . .

RUN npm install  && npm install next -g
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]