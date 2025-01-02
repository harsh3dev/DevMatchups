# Dockerfile
FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY prisma ./prisma/
COPY package*.json ./
COPY . .

RUN npm install
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]