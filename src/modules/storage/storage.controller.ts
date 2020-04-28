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
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StorageService } from './storage.service';
import { Storage } from '../../entity/storage.entity';
import { StorageDto } from './storage.dto';
import { PageResult } from '../page.common';
import { StorageQuery } from '../storage/storage.dto';
@Controller('storage')
@ApiTags('对象存储数据操作')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}
  @ApiOperation({ summary: '新增数据' })
  @Post()
  create(@Body() storageDto: StorageDto): Promise<Storage> {
    return this.storageService.create(storageDto);
  }
  @ApiOperation({ summary: '分页数据查询' })
  @Get('page')
  findPage(@Query() storageQuery: StorageQuery): Promise<PageResult<Storage>> {
    return this.storageService.findPage(storageQuery);
  }
  @ApiOperation({ summary: '根据id查询' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Storage> {
    return this.storageService.findOne(id);
  }

  @ApiOperation({ summary: '逻辑删除，实际是修改' })
  @Put(':id')
  delete(@Param('id') id: string) {
    return this.storageService.delete(id);
  }

  @ApiOperation({
    summary: '物理删除',
    description: '物理删除,从数据库中删除数据',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.storageService.remove(id);
  }
}
