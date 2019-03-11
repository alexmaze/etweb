import { TypeOrmModuleOptions } from "@nestjs/typeorm"

export interface IOssOptions {
  bucket: string
  accessKey: string
  secretKey: string
  domain: string
}

export interface IConfig {
  name: string
  port: number
  database: TypeOrmModuleOptions
  oss: IOssOptions
}
