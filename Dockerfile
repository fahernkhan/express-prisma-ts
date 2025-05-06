# Stage 1: Build
FROM node:20-alpine AS builder

# Install system dependencies for Prisma
RUN apk add --no-cache openssl python3 make g++ \
  && npm install -g npm@latest


WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./
COPY src ./src/

RUN npm ci
RUN npx prisma generate
RUN npm run build

COPY . .

RUN npm run build

# Stage 2: Production
FROM node:20-alpine

# Install runtime dependencies
RUN apk add --no-cache openssl postgresql-client

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Healthcheck mechanism to ensure database connection
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD psql "$DATABASE_URL" -c "SELECT 1"

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]