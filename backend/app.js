import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors';

import { error } from './src/middlewares/error.middleware.js';


const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
     origin: 'https://apimarketplace-pi.vercel.app',
    origin: process.env.origin,
    credentials: true
}))



import userRouter from './src/routes/user.routes.js';
import adminRouter from './src/routes/admin.routes.js';

app.use("/api/users", userRouter)
app.use("/api/admin", adminRouter)






app.use(error)

export { app }
