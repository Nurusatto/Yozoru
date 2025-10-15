FROM node:20-alpine AS builder

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./
RUN npm ci

# Копируем исходный код
COPY . .

# Генерируем Prisma клиент и собираем приложение
RUN npx prisma generate
RUN npm run build

# ===== Runtime Stage =====
FROM node:20-alpine AS runtime

WORKDIR /app

# Копируем package.json
COPY package*.json ./

# Устанавливаем только production зависимости
RUN npm ci --only=production

# Устанавливаем prisma CLI для миграций
RUN npm install prisma --save-dev

# Копируем собранное приложение и Prisma схему
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Создаем скрипт запуска с миграциями
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'echo "Waiting for database..."' >> /app/start.sh && \
    echo 'sleep 10' >> /app/start.sh && \
    echo 'echo "Running database migrations..."' >> /app/start.sh && \
    echo 'npx prisma migrate deploy || npx prisma db push --accept-data-loss' >> /app/start.sh && \
    echo 'echo "Starting NestJS application..."' >> /app/start.sh && \
    echo 'node dist/main.js' >> /app/start.sh && \
    chmod +x /app/start.sh

EXPOSE 3000

CMD ["/app/start.sh"]