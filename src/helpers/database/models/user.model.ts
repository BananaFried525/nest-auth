import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Provider } from 'src/helpers/database/models'

@Table({
  tableName: 'user',
  modelName: 'User'
})
export class User extends Model<User> {
  @Column({
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    type: DataType.NUMBER,
  })
  id: number;

  @ForeignKey(() => Provider)
  @Column({
    field: 'provider_id',
    type: DataType.NUMBER,
  })
  providerId: number;

  @Column({
    field: 'reference',
    allowNull: false,
    type: DataType.STRING(10),
  })
  reference: string;

  @Column({
    field: 'email',
    allowNull: true,
    defaultValue: null,
    type: DataType.STRING(255),
  })
  email: string | null;

  @Column({
    field: 'provider_reference',
    allowNull: true,
    defaultValue: null,
    type: DataType.STRING(255),
  })
  providerReference: string | null;

  @Column({
    field: 'display_name',
    allowNull: false,
    type: DataType.STRING(255),
  })
  displayName: string;

  @Column({
    field: 'password',
    allowNull: true,
    defaultValue: null,
    type: DataType.STRING(255),
  })
  password: string | null;


  @Column({
    field: 'created_at',
    type: DataType.DATE,
  })
  createdAt: Date;

  @Column({
    field: 'updated_at',
    type: DataType.DATE,
  })
  updatedAt: Date;

  @BelongsTo(() => Provider)
  Provider?: Provider;
}
