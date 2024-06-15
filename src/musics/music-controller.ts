import { Request, Response } from 'express'
import { CreateMusicDto } from './dtos/CreateMusic.dto'
import MusicService from './music-service'

class MusicController {
  private eventService: MusicService

  constructor(eventService: MusicService) {
    this.eventService = eventService
  }

  createMusic = async (req: Request, res: Response): Promise<void> => {
    try {
      const CreateMusicDto: CreateMusicDto = req.body
      const music = await this.eventService.createMusic(CreateMusicDto)
      res.status(201).json(music)
    } catch (error: any) {
      res.status(500).send({ error: error.message })
    }
  }

  getMusics = async (req: Request, res: Response): Promise<void> => {
    try {
      const city: string | null = (req.query.city as string) || null
      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 10
      const sortBy = (req.query.sortBy as string) || 'date'
      const sortDirection = (req.query.sortDirection as 'asc' | 'desc') || 'asc'
      const events = await this.eventService.getMusics(
        city,
        page,
        limit,
        sortBy,
        sortDirection
      )
      res.status(200).json(events)
    } catch (error: any) {
      res.status(500).send({ error: error.message })
    }
  }

  getMusicByID = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const event = await this.eventService.getMusicByID(id)
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
