import mongoose, { SortOrder } from 'mongoose'
import { CreateMusicDto } from './dtos/CreateMusic.dto'
import MusicModel, { IMusic } from './models/Music'
import { Music } from './types/response'

class MusicService {
  async getMusicByID(id: string): Promise<IMusic | null> {
    return await MusicModel.findById(id).exec()
  }

  async getMusics(
  ): Promise<IMusic[]> {
    
    return await MusicModel.find();
  }

  async createMusic(
    createEventDto: CreateMusicDto,
    fileUrl: string
  ): Promise<IMusic> {
    const { name, artist, date, duration } = createEventDto
    const newEvent = new MusicModel({
      name,
      src: fileUrl,
      date: new Date(date),
      artist,
      duration
    })

    await newEvent.save()
    return newEvent
  }
}

export default MusicService
