import mongoose, { SortOrder } from 'mongoose'
import { CreateMusicDto } from './dtos/CreateMusic.dto'
import MusicModel, { IMusic } from './models/Music'
import { Music } from './types/response'

class MusicService {
  async getMusicByID(id: string): Promise<IMusic | null> {
    return await MusicModel.findById(id).exec()
  }

  async getMusics(
    city: string | null,
    page: number,
    limit: number,
    sortBy: string,
    sortDirection: 'asc' | 'desc'
  ): Promise<IMusic[]> {
    const skip = (page - 1) * limit
    const sortOptions: { [key: string]: SortOrder } = {
      [sortBy]: sortDirection === 'asc' ? 1 : -1
    }

    const filter: { location?: string } = {}
    if (city) {
      filter.location = city
    }

    return await MusicModel.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .exec()
  }

  async createMusic(createEventDto: CreateMusicDto): Promise<IMusic> {
    const { name, artist, date, src, duration } = createEventDto
    const newEvent = new MusicModel({
      name,
      src,
      date: new Date(date),
      artist,
      duration
    })

    await newEvent.save()
    return newEvent
  }
}

export default MusicService
