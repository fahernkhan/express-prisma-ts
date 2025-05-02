# Stage 1: Build
FROM node:20-alpine AS builder

# Install system dependencies untuk Prisma
RUN apk add --no-cache openssl python3 make g++
RUN npm install -g npm@latest


WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci
RUN npx prisma generate

COPY . .

RUN npm run build

# Stage 2: Production
FROM node:20-alpine

# Install runtime dependencies
RUN apk add --no-cache openssl

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]