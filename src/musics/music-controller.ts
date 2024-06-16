import { Request, Response } from 'express'
import { CreateMusicDto } from './dtos/CreateMusic.dto'
import MusicService from './music-service'
import { getAudioDurationInSeconds } from 'get-audio-duration' // Import get-audio-duration

class MusicController {
  private musicService: MusicService

  constructor(musicService: MusicService) {
    this.musicService = musicService
  }

  createMusic = async (req: Request, res: Response): Promise<void> => {
    try {
      const createMusicDto: CreateMusicDto = req.body
      const file = (req as any).file
      const fileUrl = file.location

      const music = await this.musicService.createMusic(createMusicDto, fileUrl)
      res.status(201).json(music)
    } catch (error: any) {
      res.status(500).send({ error: error.message })
    }
  }

  deleteMusicById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      await this.musicService.deleteMusicById(id)
      res.status(204).send()
    } catch (error: any) {
      res.status(500).send({ error: error.message })
    }
  }

  getMusics = async (req: Request, res: Response): Promise<void> => {
    try {
      const musics = await this.musicService.getMusics()
      res.status(200).json(musics)
    } catch (error: any) {
      res.status(500).send({ error: error.message })
    }
  }

  getMusicByID = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const music = await this.musicService.getMusicByID(id)
      if (!music) {
        res.status(404).json({ message: 'Music not found' })
        return
      }
      res.status(200).json(music)
    } catch (error: any) {
      res.status(500).send({ error: error.message })
    }
  }
}

export default MusicController
