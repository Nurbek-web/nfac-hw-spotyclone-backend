import { Request, Response } from 'express'
import { CreateMusicDto } from './dtos/CreateMusic.dto'
import MusicService from './music-service'

class MusicController {
  private musicService: MusicService

  constructor(musicService: MusicService) {
    this.musicService = musicService
  }

  createMusic = async (req: Request, res: Response): Promise<void> => {
    try {
      const CreateMusicDto: CreateMusicDto = req.body
      const fileUrl = (req as any).file.location

      const music = await this.musicService.createMusic(CreateMusicDto, fileUrl)
      res.status(201).json(music)
    } catch (error: any) {
      res.status(500).send({ error: error.message })
    }
  }

  getMusics = async (req: Request, res: Response): Promise<void> => {
    try {
      const events = await this.musicService.getMusics()
      res.status(200).json(events)
    } catch (error: any) {
      res.status(500).send({ error: error.message })
    }
  }

  getMusicByID = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const event = await this.musicService.getMusicByID(id)
      if (!event) {
        res.status(404).json({ message: 'Event not found' })
        return
      }
      res.status(200).json(event)
    } catch (error: any) {
      res.status(500).send({ error: error.message })
    }
  }
}

export default MusicController
