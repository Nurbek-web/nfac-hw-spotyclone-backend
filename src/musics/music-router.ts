import { Router } from 'express'
import MusicController from './music-controller'
import MusicService from './music-service'
import { authMiddleware } from '../middlewares/auth-middleware'
import upload from '../lib/multer'

const musicRouter = Router()

const musicService = new MusicService()
const musicController = new MusicController(musicService)

musicRouter.get('/musics/', musicController.getMusics)
musicRouter.post('/musics/', musicController.createMusic)
musicRouter.get('/musics/:id', musicController.getMusicByID)

musicRouter.post('/', upload.single('file'), (req: any, res: any) => {
  res.status(200).json({ fileUrl: req.file.location })
})

export default musicRouter
