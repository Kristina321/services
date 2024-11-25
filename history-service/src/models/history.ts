import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import sequelize from '../config/database';

interface HistoryAttributes {
  id: number;
  product_id: string;
  shop_id: string;
  action: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface HistoryCreationAttributes extends Optional<HistoryAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

const createField = (
  type: any,
  allowNull: boolean = false,
  options: any = {}
) => ({
  type,
  allowNull,
  ...options
});

class History extends Model<HistoryAttributes, HistoryCreationAttributes> implements HistoryAttributes {
  public id!: number;
  public product_id!: string;
  public shop_id!: string;
  public action!: string;
  public date!: Date;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

History.init(
  {
    id: createField(DataTypes.INTEGER.UNSIGNED, false, { autoIncrement: true, primaryKey: true }),
    product_id: createField(DataTypes.STRING, false),
    shop_id: createField(DataTypes.STRING, false),
    action: createField(DataTypes.STRING, false),
    date: createField(DataTypes.DATE, false),
    createdAt: createField(DataTypes.DATE, false, { defaultValue: DataTypes.NOW }),
    updatedAt: createField(DataTypes.DATE, false, { defaultValue: DataTypes.NOW })
  },
  {
    sequelize,
    tableName: 'histories',
    timestamps: true, // Включение автоматического управления timestamps
  }
);

export default History;
