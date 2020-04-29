import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from '../../entity/user.entity';
import { UserDto, UserQuery } from './user.dto';
import { PageResult } from '../page.common';

@Controller('user')
@ApiTags('对用户数据操作')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOperation({ summary: '新增数据' })
  @Post()
  create(@Body() userDto: UserDto): Promise<User> {
    return this.userService.create(userDto);
  }
  @ApiOperation({ summary: '分页数据查询' })
  @Get()
  findPage(@Query() userQuery: UserQuery): Promise<PageResult<User>> {
    return this.userService.findPage(userQuery);
  }
  @ApiOperation({ summary: '根据id查询' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: '逻辑删除' })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
