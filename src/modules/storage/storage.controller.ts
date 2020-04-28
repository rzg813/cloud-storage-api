import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  Put,
} from '@nestjs/common';
import { StorageService } from './storage.service';
import { Storage } from '../../entity/storage.entity';
import { StorageDto } from './storage.dto';
import { PageResult } from '../page.common';
import { StorageQuery } from '../storage/storage.dto';
import { ApiTags } from '@nestjs/swagger';
@Controller('storage')
@ApiTags('对象存储数据操作')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}
  @Post()
  create(@Body() storageDto: StorageDto): Promise<Storage> {
    return this.storageService.create(storageDto);
  }

  @Get('page')
  findPage(@Query() storageQuery: StorageQuery): Promise<PageResult<Storage>> {
    return this.storageService.findPage(storageQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Storage> {
    return this.storageService.findOne(id);
  }

  @Put(':id')
  delete(@Param('id') id: string) {
    return this.storageService.delete(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.storageService.remove(id);
  }
}
