import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { StorageService } from './storage.service';
import { Storage } from '../../entity/storage.entity';
import { StorageDto } from './storage.dto';
@Controller('storage')
export class StorageController {
  constructor(private readonly userService: StorageService) {}
  @Post()
  create(@Body() storageDto: StorageDto): Promise<Storage> {
    return this.userService.create(storageDto);
  }

  @Get('list')
  findAll(): Promise<Storage[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Storage> {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
