import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    CreatedAt,
    UpdatedAt,
    DataType,
    AllowNull
  } from 'sequelize-typescript';
  
  @Table({ tableName: 'incidents' })
  export class Incident extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;
  
    @AllowNull(false)
    @Column
    userId!: string;
  
    @AllowNull(false)
    @Column
    type!: string; // e.g., "fall", "behaviour"
  
    @AllowNull(false)
    @Column(DataType.TEXT)
    description!: string;
  
    @AllowNull(true)
    @Column(DataType.TEXT)
    summary?: string;
  
    @CreatedAt
    @Column
    createdAt!: Date;
  
    @UpdatedAt
    @Column
    updatedAt!: Date;
  }
  