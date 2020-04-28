import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entity/user.entity';
import { UserDto, UserQuery } from '../user/user.dto';
import { PageResult } from '../page.common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  // 分页查询，带条件查询
  async findPage(userQuery: UserQuery): Promise<PageResult<User>> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    console.log(userQuery);
    queryBuilder.where('user.deleted=0');
    if (userQuery) {
      let { pageIndex, pageSize } = userQuery;
      if (pageIndex || pageIndex === 0) pageIndex = 1;
      if (pageSize || pageSize === 0) pageSize = 10;
      queryBuilder
        .take(pageSize) //Sets maximal number of entities to take.
        .skip(pageSize * (pageIndex - 1)); //Sets number of entities to skip.
    }
    if (userQuery.mobile) {
      queryBuilder.andWhere('(user.title LIKE :mobile)');
    }
    if (userQuery.nickname) {
      queryBuilder.andWhere('(user.nickname LIKE :nickname)');
    }
    queryBuilder.orderBy('user.createAt', 'DESC').setParameters({
      mobile: '%' + userQuery.mobile + '%',
      nickname: '%' + userQuery.nickname + '%',
    });
    if (userQuery.locked) {
      queryBuilder.where('user.locked=' + userQuery.locked);
    } else {
      queryBuilder.where('user.locked=0');
    }
    if (userQuery.enabled) {
      queryBuilder.where('user.enabled=' + userQuery.enabled);
    } else {
      queryBuilder.where('user.enabled=0');
    }
    const result = new PageResult<User>();
    const [entities, total] = await queryBuilder.getManyAndCount();
    result.data = entities;
    result.total = total;
    result.pageIndex = userQuery.pageIndex;
    result.pageSize = userQuery.pageSize;
    return result;
  }

  // 根据id查询
  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }
  // 创建
  async create(userDto: UserDto): Promise<User> {
    const user = new User();
    user.loginName = userDto.loginName;
    user.password = userDto.password;
    user.mobile = userDto.mobile;
    user.avatar = userDto.avatar;
    user.email = userDto.email;
    user.nickname = userDto.nickname;
    user.sex = userDto.sex;
    user.source = 'weixin';
    return await this.userRepository.save(user);
  }
  // 逻辑删除
  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findOne(id);
    user.deleted = 1;
    await this.userRepository.save(user);
  }
}
