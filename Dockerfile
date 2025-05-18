FROM node:20-alpine

RUN apk add --no-cache libssl1.1

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci
RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy || echo 'Migration failed, continuing...' && npm start"]
