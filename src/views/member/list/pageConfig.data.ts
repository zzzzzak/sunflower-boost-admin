import { BasicColumn, FormSchema } from '@/components/Table';

// @PrimaryGeneratedColumn('increment')
// id: number;

// @Column({ unique: true, comment: '币安钱包地址' })
// walletAddress: string;

// @Column({ nullable: true, comment: '名称' })
// username: string;

// @Column({
//   default: getConfig('SITE_CONFIG').user_default_nickname,
//   comment: '用户昵称',
// })
// nickname: string;

// @Column({
//   nullable: true,
//   comment: '用户简介',
// })
// introduction: string;

// @Column({
//   default: getConfig('SITE_CONFIG').user_default_avatar,
//   comment: '用户头像',
// })
// avatar: string;

// @Column({
//   comment: '用户性别',
//   type: 'enum',
//   enum: Gender,
//   default: Gender.OTHER,
//   nullable: true,
// })
// gender: () => Gender;

// @Column({
//   comment: '邀请码',
//   default: '',
//   unique: true, // 设置邀请码字段为唯一约束
// })
// inviteCode: string;

// @Column({ comment: '邀请人Id', nullable: true })
// inviterId: number;

// @ManyToOne(() => User, (inviter) => inviter.invitedUsers, { nullable: true })
// @JoinColumn({ name: 'inviterId' })
// inviter: User;

// @OneToMany(() => User, (invitedUser) => invitedUser.inviter, {
//   nullable: true,
// })
// invitedUsers: User[];

// @OneToMany(() => Commission, (commission) => commission.user, {
//   nullable: true,
// })
// commissions: Commission[];

// @OneToMany(() => Order, (order) => order.user)
// orders: Order[];

// @OneToMany(() => Order, (order) => order.user)
// withdrawals: Order[];

// @ManyToOne(() => Level, (level) => level.users)
// @JoinColumn({ name: 'levelId' })
// level: Level;

// @Column({ comment: '用户等级Id', nullable: true })
// levelId: number;

// @Column({
//   default: 0,
//   type: 'decimal',
//   precision: 15,
//   scale: 6,
//   comment: '用户入金金额',
//   transformer: new ColumnNumericTransformer(),
// })
// investmentAmount: number;

// @Column({
//   default: 0,
//   type: 'decimal',
//   precision: 15,
//   scale: 6,
//   comment: '用户收益金额',
//   transformer: new ColumnNumericTransformer(),
// })
// earningsAmount: number;

// @Column({
//   default: 0,
//   type: 'decimal',
//   precision: 15,
//   scale: 6,
//   comment: '用户提现金额',
//   transformer: new ColumnNumericTransformer(),
// })
// withdrawalAmount: number;

// @Column({
//   default: 0,
//   type: 'decimal',
//   precision: 15,
//   scale: 6,
//   comment: '冻结金额',
//   transformer: new ColumnNumericTransformer(),
// })
// frozenAmount: number;

// @Column({
//   default: 0,
//   type: 'decimal',
//   precision: 15,
//   scale: 6,
//   comment: '慈善金（提现手续费）',
// })
// charityAmount: number;

// @Column({
//   type: 'datetime',
//   default: () => 'CURRENT_TIMESTAMP',
//   comment: '创建时间',
// })
// createdAt: Date;

// @Column({
//   type: 'datetime',
//   default: () => 'CURRENT_TIMESTAMP',
//   onUpdate: 'CURRENT_TIMESTAMP',
//   comment: '更新时间',
// })
// updatedAt: Date;

// 通过上面实体配置生成以下页面配置：
export const columns: BasicColumn[] = [
  { dataIndex: 'id', title: 'ID' },
  { dataIndex: 'walletAddress', title: '币安钱包地址' },
  { dataIndex: 'username', title: '名称' },
  { dataIndex: 'nickname', title: '用户昵称' },
  { dataIndex: 'introduction', title: '用户简介' },
  { dataIndex: 'avatar', title: '用户头像' },
  { dataIndex: 'inviteCode', title: '邀请码' },
  { dataIndex: 'inviterId', title: '邀请人Id' },
  {
    dataIndex: 'level',
    title: '等级',
    customRender: ({ record }) => {
      return record.level?.name;
    },
  },
  { dataIndex: 'levelId', title: '等级Id' },
  { dataIndex: 'investmentAmount', title: '入金金额' },
  { dataIndex: 'earningsAmount', title: '收益金额' },
  { dataIndex: 'withdrawalAmount', title: '提现金额' },
  { dataIndex: 'frozenAmount', title: '冻结金额' },
  { dataIndex: 'charityAmount', title: '慈善金' },
  { dataIndex: 'createdAt', title: '创建时间' },
  { dataIndex: 'updatedAt', title: '更新时间' },
];

export const searchFormSchema: FormSchema[] = [
  { label: '用户姓名', field: 'member_username', component: 'Input' },
  {
    label: '创建时间',
    field: 'createdAt',
    component: 'RangePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
