import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from 'src/helpers/database/models'

@Table({
  tableName: 'provider',
  modelName: 'Provider',
  createdAt: false,
  updatedAt: false,
})
export class Provider extends Model<Provider> {
  @Column({
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    type: DataType.NUMBER,
  })
  id: number;

  @Column({
    field: 'name',
    type: DataType.STRING(255),
  })
  name: string;

  @Column({
    field: 'short_name',
    type: DataType.STRING(20),
  })
  shortName: string;

  @Column({
    field: 'image_url',
    type: DataType.TEXT,
  })
  imageUrl: string;

  @HasMany(() => User)
  Users?: User[]
}