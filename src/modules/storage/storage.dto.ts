import { ApiProperty } from '@nestjs/swagger';
export class StorageDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  src: string;
  @ApiProperty()
  path: string;
  @ApiProperty()
  refTable: string;
  @ApiProperty()
  tags: string;
  @ApiProperty()
  storageType?: string;
}
export class StorageQuery {
  @ApiProperty({ required: false })
  title?: string;
  @ApiProperty({ required: false })
  tags?: string;
  @ApiProperty({ required: false, default: 1 })
  pageIndex: number;
  @ApiProperty({ required: false, default: 10 })
  pageSize: number;
  @ApiProperty({ required: false, default: 0 })
  deleted?: number;
}
