import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Storage } from '../../entity/storage.entity';
import { StorageDto, StorageQuery } from '../storage/storage.dto';
import { PageResult } from '../page.common';

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(Storage)
    private readonly storageRepository: Repository<Storage>,
  ) {}

  // 分页查询，带条件查询
  async findPage(storageQuery: StorageQuery): Promise<PageResult<Storage>> {
    const queryBuilder = this.storageRepository.createQueryBuilder('storage');
    if (storageQuery.page) {
      const { pageIndex, pageSize } = storageQuery.page;
      queryBuilder
        .skip(pageIndex > 0 ? pageIndex : 1)
        .take(pageSize > 0 ? pageSize : 10);
    }
    if (storageQuery.title) {
      queryBuilder.andWhere('(storage.title LIKE :title)');
    }
    if (storageQuery.tags) {
      queryBuilder.andWhere('(storage.tags LIKE :tags)');
    }
    if (storageQuery.deleted) {
      queryBuilder.where('storage.deleted=' + storageQuery.deleted);
    } else {
      queryBuilder.where('storage.deleted=0');
    }
    queryBuilder.orderBy('storage.createAt', 'DESC').setParameters({
      title: '%' + storageQuery.title + '%',
      tags: '%' + storageQuery.tags + '%',
    });
    const result = new PageResult<Storage>();
    result.data = await queryBuilder.getMany();
    result.pageIndex = storageQuery.page.pageIndex;
    result.pageSize = storageQuery.page.pageSize;
    return result;
  }

  // 根据id查询
  async findOne(id: string): Promise<Storage> {
    return await this.storageRepository.findOne(id);
  }
  // 创建
  async create(storageDto: StorageDto): Promise<Storage> {
    const storage = new Storage();
    storage.title = storageDto.title;
    storage.src = storageDto.src;
    storage.path = storageDto.path;
    storage.tags = storageDto.tags;
    storage.storageType = storageDto.storageType;
    storage.refTable = 'default';
    storage.creator = '管理员';
    return await this.storageRepository.save(storage);
  }
  // 逻辑删除
  async delete(id: string): Promise<void> {
    const storage = await this.storageRepository.findOne(id);
    storage.deleted = 1;
    await this.storageRepository.save(storage);
  }

  // 物理删除
  async remove(id: string): Promise<void> {
    await this.storageRepository.delete(id);
  }
}
