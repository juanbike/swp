/* eslint-disable prettier/prettier */
import { DataSource, DataSourceOptions } from "typeorm";



export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'Canela123$$',
      database: process.env.DB_DATABASE || 'juntas',
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/db/migrations/*.js'],
     synchronize: process.env.NODE_ENV !== 'production', // Desactivar sincronización en producción
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false, // Configuración SSL si es necesario
}

const dataSource = new DataSource (dataSourceOptions)

export default dataSource