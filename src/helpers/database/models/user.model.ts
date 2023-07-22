import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class UserModel extends Model {
  @Column({
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    type: DataType.NUMBER,
  })
  id: number;

  @Column({
    field: 'user_name',
    unique: true,
    type: DataType.STRING(255),
  })
  userName: string;

  @Column({
    field: 'reference',
    unique: true,
    type: DataType.STRING(255),
  })
  reference: string;

  @Column({
    field: 'created_at',
    type: DataType.DATE,
  })
  createdAt?: Date;

  @Column({
    field: 'updated_at',
    type: DataType.DATE,
    onUpdate: 'SET DEFAULT',
  })
  updatedAt?: Date;
}
