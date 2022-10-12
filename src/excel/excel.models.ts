import {
  // BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
// import { ExcelModule } from './excel.module';

// interface USerCreationAttrs {
//   email: string;
//   password: string;
// }

@Table({ tableName: 'excel' })
export class ExcelModel extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  profile: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  department: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  faculty: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  qualification: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  formStudy: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  educationTerm: string;

  @Column({
    type: DataType.ARRAY(DataType.JSON),
    defaultValue: [],
  })
  directions: { code: number; nameDirection: string }[];
}
