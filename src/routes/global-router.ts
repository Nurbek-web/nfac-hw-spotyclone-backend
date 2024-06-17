import { Router } from 'express'
import authRouter from '../auth/auth-router'
import musicRouter from '../musics/music-router'

const globalRouter = Router()

globalRouter.use('/auth', authRouter)
globalRouter.use(musicRouter)

export default globalRouter
