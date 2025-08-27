import app from './app';
import redisClient from './infrastructure/db/redis/redis-client';

import dotenv from 'dotenv';
dotenv.config();

const start = async () => {
	redisClient.on('error', (err) => console.error('Ошибка при запуске redis:', err));
	redisClient.connect().then(() => {
		console.log('Redis запущен')
	}).catch(console.error);

	app.listen(process.env.PORT, () => {
		console.log(`Сервер запщуен на порту --> ${process.env.PORT}`)
	});
};

start();