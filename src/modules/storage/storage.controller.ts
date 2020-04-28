import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { StorageService } from './storage.service';
import { Storage } from '../../entity/storage.entity';
import { StorageDto } from './storage.dto';
import { PageResult } from '../page.common';
import { StorageQuery } from '../storage/storage.dto';
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}
  @Post()
  create(@Body() storageDto: StorageDto): Promise<Storage> {
    return this.storageService.create(storageDto);
  }

  @Get('list')
  findPage(storageQuery: StorageQuery): Promise<PageResult<Storage>> {
    return this.storageService.findPage(storageQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Storage> {
    return this.storageService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.storageService.remove(id);
  }
}
