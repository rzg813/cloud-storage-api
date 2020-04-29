import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  Generated,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pf_user')
export class User {
  @PrimaryColumn({
    name: 'id',
    type: 'varchar',
    length: 36,
    comment: '用户ID',
  })
  @Generated('uuid') // 自动生成列
  id: string;

  @Column({
    name: 'loginName',
    type: 'varchar',
    length: 128,
    comment: '用户登录账号',
  })
  loginName: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 256,
    comment: '用户登录密码',
  })
  password: string;

  @Column({
    name: 'openid',
    type: 'varchar',
    length: 128,
    default: '',
    comment: '用户绑定的微信openid',
  })
  openid: string;

  @Column({
    name: 'userType',
    type: 'int',
    default: 0,
    comment: '用户类型：0-普通用户，1-后台管理员,2-开发者,3-内置用户',
  })
  userType: string;
  @Column({ name: 'avatar', type: 'varchar', length: 128, comment: '用户头像' })
  avatar: string;
  @Column({
    name: 'mobile',
    type: 'varchar',
    length: 128,
    comment: '用户手机号',
  })
  mobile: string;

  @Column({ name: 'email', type: 'varchar', length: 128, comment: '用户邮箱' })
  email: string;

  @Column({
    name: 'nickname',
    type: 'varchar',
    length: 128,
    comment: '用户昵称',
  })
  nickname: string;

  @Column({
    name: 'sex',
    type: 'varchar',
    length: 128,
    comment: '性别：男，女，不详',
  })
  sex: string;
  @Column({
    name: 'source',
    type: 'varchar',
    length: 128,
    comment: '用户来源：weixin',
  })
  source: string;
  @Column({
    name: 'locked',
    type: 'int',
    default: 0,
    comment: '账号是否锁定，0-正常，1-锁定',
  })
  locked: number;
  @Column({
    name: 'enabled',
    type: 'int',
    default: 0,
    comment: '是否启用，0-启用，1-禁用',
  })
  enabled: number;

  @CreateDateColumn({ name: 'createAt', comment: '创建时间' })
  createAt: string;

  @UpdateDateColumn({ name: 'updateAt', comment: '更新时间' })
  updateAt: string;
  @Column({
    name: 'deleted',
    type: 'int',
    default: 0,
    comment: '是否已删除,0-未删除，1-删除',
  })
  deleted: number;
}
