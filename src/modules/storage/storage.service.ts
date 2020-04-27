import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Storage } from '../../entity/storage.entity';
import { StorageDto } from '../storage/storage.dto';

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(Storage)
    private readonly repository: Repository<Storage>,
  ) {}

  async findAll(): Promise<Storage[]> {
    return await this.repository.find();
  }

  async findOne(id: string): Promise<Storage> {
    return await this.repository.findOne(id);
  }

  async create(storageDto: StorageDto): Promise<Storage> {
    const storage = new Storage();
    storage.title = storageDto.title;
    storage.src = storageDto.src;
    storage.path = storageDto.path;
    storage.refTable = 'default';
    storage.creator = '管理员';
    return await this.repository.save(storage);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
