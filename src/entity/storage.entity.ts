import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  Generated,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pf_storage')
export class Storage {
  @PrimaryColumn({
    name: 'id',
    type: 'varchar',
    length: 36,
    comment: '资源存储ID',
  })
  @Generated('uuid') // 自动生成列
  id: number;

  @Column({ name: 'title', type: 'varchar', length: 128, comment: '资源名称' })
  title: string;

  @Column({ name: 'src', type: 'varchar', length: 256, comment: '资源地址' })
  src: string;

  @Column({ name: 'path', type: 'varchar', length: 128, comment: '资源路径' })
  path: string;

  @Column({
    name: 'tags',
    type: 'varchar',
    length: 128,
    comment: '资源标签，用来搜索',
  })
  tags: string;

  @Column({
    name: 'storageType',
    type: 'varchar',
    length: 128,
    comment: '资源类型：腾讯云|阿里云|华为云|七牛云',
  })
  storageType: string;

  @Column({
    name: 'refTable',
    type: 'varchar',
    length: 128,
    comment: '引用表名',
  })
  refTable: string;

  @Column({
    name: 'creator',
    type: 'varchar',
    length: 128,
    comment: '引用表名',
  })
  creator: string;

  @CreateDateColumn({ name: 'createAt', comment: '创建时间' })
  createAt: string;

  @UpdateDateColumn({ name: 'updateAt', comment: '更新时间' })
  updateAt: string;

  @Column({
    name: 'deleted',
    type: 'int',
    comment: '是否已删除,0-未删除，1-删除',
    default: 0,
  })
  deleted: number;
}
