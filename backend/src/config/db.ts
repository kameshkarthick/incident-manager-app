import { Sequelize } from 'sequelize-typescript';
import { Incident } from '../models/incident';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  models: [Incident],
  logging: false,
});