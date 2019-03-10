import { TypeOrmModuleOptions } from "@nestjs/typeorm"

export interface IConfig {
  name: string
  port: number
  database: TypeOrmModuleOptions
}
