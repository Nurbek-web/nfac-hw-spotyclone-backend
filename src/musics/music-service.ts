import mongoose, { SortOrder } from 'mongoose'
import { CreateMusicDto } from './dtos/CreateMusic.dto'
import MusicModel, { IMusic } from './models/Music'
import { Music } from './types/response'

class MusicService {
  async getMusicByID(id: string): Promise<IMusic | null> {
    return await MusicModel.findById(id).exec()
  }

  async getMusics(): Promise<IMusic[]> {
    return await MusicModel.find()
  }

  async deleteMusicById(id: string): Promise<void> {
    await MusicModel.findByIdAndDelete(id)
  }

  async createMusic(
    createMusicDto: CreateMusicDto,
    fileUrl: string
  ): Promise<IMusic> {
    const { name, artist, duration } = createMusicDto
    const newEvent = new MusicModel({
      name,
      src: fileUrl,
      date: new Date(),
      artist,
      duration
    })

    await newEvent.save()
    return newEvent
  }
}

export default MusicService
