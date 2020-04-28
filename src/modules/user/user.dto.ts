import { ApiProperty } from '@nestjs/swagger';
export class UserDto {
  @ApiProperty()
  loginName: string;
  @ApiProperty()
  password: string;
  openid: string;
  userType: string;
  @ApiProperty()
  avatar: string;
  @ApiProperty()
  mobile: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  nickname: string;
  @ApiProperty()
  sex: string;
  source: string;
  locked: string;
  enabled: string;
}
export class UserQuery {
  @ApiProperty({ required: false, default: 1 })
  pageIndex?: number;
  @ApiProperty({ required: false, default: 10 })
  pageSize?: number;
  @ApiProperty({ required: false })
  mobile?: string;
  @ApiProperty({ required: false })
  nickname?: string;
  @ApiProperty({ required: false, default: 0 })
  userType?: number;
  @ApiProperty({ required: false, default: 0 })
  locked?: number;
  @ApiProperty({ required: false, default: 0 })
  enabled?: number;
}
