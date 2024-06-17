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
musicRouter.delete('/musics/:id/', musicController.deleteMusicById)

// musicRouter.post(
//   '/artists',
//   upload.single('file'),
//   musicController.createArtist
// )
musicRouter.post('/upload', upload.single('file'), musicController.createMusic)

export default musicRouter
