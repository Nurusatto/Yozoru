FROM node:20-alpine AS builder

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./
RUN npm ci

# Копируем исходный код
COPY . .

# Генерируем Prisma клиент и собираем приложение
RUN npm run prisma:generate
RUN npm run build

# ===== Runtime Stage =====
FROM node:20-alpine AS runtime

WORKDIR /app

# Копируем package.json
COPY package*.json ./

# Устанавливаем все зависимости (нужны для миграций)
RUN npm ci

# Копируем собранное приложение и Prisma схему
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Генерируем Prisma клиент в runtime контейнере
RUN npm run prisma:generate

# Создаем скрипт запуска с миграциями и очисткой БД
# RUN echo '#!/bin/sh' > /app/start.sh && \
#     echo 'echo "Waiting for database..."' >> /app/start.sh && \
#     echo 'sleep 10' >> /app/start.sh && \
#     echo 'echo "Resetting database..."' >> /app/start.sh && \
#     echo 'npx prisma migrate reset --force --skip-generate --skip-seed' >> /app/start.sh && \
#     echo 'echo "Running database migrations..."' >> /app/start.sh && \
#     echo 'npx prisma db push' >> /app/start.sh && \
#     echo 'echo "Starting application..."' >> /app/start.sh && \
#     echo 'node dist/server.js' >> /app/start.sh && \
#     chmod +x /app/start.sh

# Создаем скрипт запуска с миграциями
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'echo "Waiting for database..."' >> /app/start.sh && \
    echo 'sleep 10' >> /app/start.sh && \
    echo 'echo "Running database migrations..."' >> /app/start.sh && \
    echo 'npx prisma db push' >> /app/start.sh && \
    echo 'echo "Starting application..."' >> /app/start.sh && \
    echo 'node dist/server.js' >> /app/start.sh && \
    chmod +x /app/start.sh


EXPOSE 3000

CMD ["/app/start.sh"]