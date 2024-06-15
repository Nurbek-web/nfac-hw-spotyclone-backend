import { Router } from 'express'
import authRouter from '../auth/auth-router'
import musicRouter from '../musics/music-router'
// other routers can be imported here

const globalRouter = Router()

globalRouter.use('/auth', authRouter)
globalRouter.use(musicRouter)

// other routers can be added here

export default globalRouter
