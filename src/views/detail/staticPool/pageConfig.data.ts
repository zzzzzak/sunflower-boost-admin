import { BasicColumn, FormSchema } from '@/components/Table';
import { Tinymce } from '@/components/Tinymce';
import { h } from 'vue';

/**
 * 
 * 
 * import { Order } from '@/order/entities/order.entity';
import { ColumnNumericTransformer } from '@/utils/typeormTransformer';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';


export enum StaticPoolStatus {
  PENDING = 'PENDING',
  ALLOCATED = 'ALLOCATED',
}

@Entity({ comment: '静态资金池列表' })
export class StaticPool {
  @PrimaryGeneratedColumn('increment', {
    comment: '静态池 ID',
  })
  id: number;

  @Column({
    unique: true,
    comment: '订单 ID',
  })
  orderId: number;

  @Column({
    comment: '状态',
    type: 'enum',
    enum: StaticPoolStatus,
    default: StaticPoolStatus.PENDING,
  })
  status: StaticPoolStatus;

  // 关联订单
  @OneToOne(() => Order, (order) => order.staticPool)
  @JoinColumn({ name: 'orderId' })
  order: Relation<Order>;

  @Column({
    comment: '静态池金额',
    type: 'decimal',
    precision: 15,
    scale: 6,
    transformer: new ColumnNumericTransformer(),
  })
  amount: number;

  @Column({
    comment: '静态池描述',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'timestamp',
    comment: '静态池创建时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    comment: '静态池更新时间',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
 */

// 通过上面实体配置生成以下页面配置：
export const columns: BasicColumn[] = [
  {
    title: '订单 ID',
    dataIndex: 'orderId',
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueEnum: [
      { label: '待分配', value: 'PENDING', color: 'gray' },
      { label: '已分配', value: 'ALLOCATED', color: 'green' },
    ],
  },
  {
    title: '静态池金额',
    dataIndex: 'amount',
  },
  {
    title: '静态池描述',
    dataIndex: 'description',
  },
  {
    title: '静态池创建时间',
    dataIndex: 'createdAt',
  },
  {
    title: '静态池更新时间',
    dataIndex: 'updatedAt',
  },
];
export const formSchema: FormSchema[] = [];
export const searchFormSchema: FormSchema[] = [
  {
    field: 'orderId',
    label: '订单 ID',
    component: 'Input',
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '待分配', value: 'PENDING' },
        { label: '已分配', value: 'ALLOCATED' },
      ],
    },
  },
  {
    field: 'createdAt',
    label: '订单创建时间',
    component: 'RangePicker',
  },
];
