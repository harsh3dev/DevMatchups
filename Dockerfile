FROM node:20-alpine

RUN apk add openssl

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
RUN npm install && npm install next -g

CMD ["npm", "run", "dev"]
