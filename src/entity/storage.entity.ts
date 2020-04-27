import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  Generated,
} from 'typeorm';

@Entity('pf_storage')
export class User {
  @PrimaryColumn({
    name: 'id',
    type: 'varchar',
    length: 32,
    comment: '资源存储ID',
  })
  @Generated('uuid') // 自动生成列
  id: number;

  @Column({ name: 'title', type: 'varchar', length: 128, comment: '资源名称' })
  title: string;

  @Column({ name: 'title', type: 'varchar', length: 256, comment: '资源地址' })
  src: string;

  @Column({ name: 'path', type: 'varchar', length: 128, comment: '资源路径' })
  path: string;

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

  @CreateDateColumn({ name: 'createdAt', comment: '创建时间' })
  createdAt: string;

  @Column({
    name: 'refTable',
    type: 'int',
    length: 2,
    comment: '是否已删除,0-未删除，1-删除',
  })
  deleted: number;
}
