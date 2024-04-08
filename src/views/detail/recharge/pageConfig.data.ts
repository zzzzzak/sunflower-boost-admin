import { BasicColumn, FormSchema } from '@/components/Table';

/**
 * 
 * import { Commission } from '@/commission/entities/commission.entity';
import { Level } from '@/level/entities/level.entity';
import { StaticPool } from '@/static-pool/entities/static-pool.entity';
import { User } from '@/user/entities/user.entity';
import { ColumnNumericTransformer } from '@/utils/typeormTransformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

export enum BinancePaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

@Entity({
  comment: '订单列表',
  orderBy: {
    createAt: 'DESC',
  },
})
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ comment: '用户ID' })
  userId: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;

  @OneToOne(() => StaticPool, (staticPool) => staticPool.order)
  staticPool: Relation<StaticPool>;

  @OneToMany(() => Commission, (commission) => commission.order)
  commissions: Relation<Commission>[];

  @Column({
    comment: '币安支付状态',
    type: 'enum',
    enum: BinancePaymentStatus,
    default: BinancePaymentStatus.SUCCESS,
  })
  binancePaymentStatus?: string;

  @Column({ comment: '币安支付交易ID', unique: true })
  transactionHash: string;

  @Column({
    comment: '订单金额',
    type: 'decimal',
    precision: 15,
    scale: 6,
    transformer: new ColumnNumericTransformer(),
  })
  amount: number;

  @Column({ comment: '订单描述', nullable: true })
  description: string;

  @Column({ comment: '订单前等级', nullable: true })
  beforeLevelId: number;

  @ManyToOne(() => Level, { eager: true }) // 指定关联关系为多对一，并指定对应的实体类
  @JoinColumn({ name: 'beforeLevelId', referencedColumnName: 'id' }) // 指定外键的名称和引用列
  beforeLevel: Relation<Level>; // 定义关联属性，用于访问关联的等级信息

  @Column({ comment: '订单后等级', nullable: true })
  afterLevelId: number;

  @ManyToOne(() => Level, { eager: true }) // 指定关联关系为多对一，并指定对应的实体类
  @JoinColumn({ name: 'afterLevelId', referencedColumnName: 'id' }) // 指定外键的名称和引用列
  afterLevel: Relation<Level>; // 定义关联属性，用于访问关联的等级信息

  @Column({
    type: 'timestamp',
    comment: '订单创建时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Column({
    type: 'timestamp',
    comment: '订单更新时间',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}

 */

const binancePaymentStatusOptions = [
  {
    label: '待付款',
    value: 'PENDING',
    color: 'gray',
  },
  {
    label: '成功',
    value: 'SUCCESS',
    color: 'green',
  },
  {
    label: '失败',
    value: 'FAILED',
    color: 'red',
  },
];

// 通过上面实体配置生成以下页面配置：
export const columns: BasicColumn[] = [
  {
    title: '用户ID',
    dataIndex: 'userId',
  },
  {
    title: '订单金额',
    dataIndex: 'amount',
  },
  {
    title: '订单描述',
    dataIndex: 'description',
  },
  {
    title: '订单前等级',
    dataIndex: 'beforeLevelId',
  },
  {
    title: '订单后等级',
    dataIndex: 'afterLevelId',
  },
  {
    title: '币安支付状态',
    dataIndex: 'binancePaymentStatus',
    valueEnum: binancePaymentStatusOptions,
  },
  {
    title: '币安支付交易ID',
    dataIndex: 'transactionHash',
  },
  {
    title: '订单创建时间',
    dataIndex: 'createAt',
  },
  {
    title: '订单更新时间',
    dataIndex: 'updateAt',
  },
];
export const formSchema: FormSchema[] = [
  {
    field: 'binancePaymentStatus',
    label: '币安支付状态',
    component: 'Select',
    required: true,
    componentProps: {
      options: binancePaymentStatusOptions,
    },
  },
];
export const searchFormSchema: FormSchema[] = [
  {
    field: 'userId',
    label: '用户ID',
    component: 'Input',
  },
  {
    field: 'binancePaymentStatus',
    label: '币安支付状态',
    component: 'Select',
    componentProps: {
      options: binancePaymentStatusOptions,
    },
  },
  {
    field: 'transactionHash',
    label: '币安支付交易ID',
    component: 'Input',
  },
  {
    field: 'createdAt',
    label: '订单创建时间',
    component: 'RangePicker',
  },
];
