import cookie from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

import { ErrorHandler } from './infrastructure/middlewares/errorHandler.middleware'
import userRouter from './infrastructure/routes/user.routes'

const app = express()

app.use(cors({
	origin: ['http://localhost:3000', 'http://localhost:5173'],
	credentials: true,
}))

app.use(helmet({
	crossOriginResourcePolicy: { policy: "cross-origin" }
}))

app.use(express.json())
app.use(cookie())

app.use('/users', userRouter)

app.use(ErrorHandler)

export default app