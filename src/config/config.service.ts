import { Injectable } from "@nestjs/common"
import * as path from "path"
import { NodeEnv, parseNodeEnv } from "./env"
import { IConfig } from "./config.interface"
import { TypeOrmOptionsFactory } from "@nestjs/typeorm"

@Injectable()
export class ConfigService implements TypeOrmOptionsFactory {
  public config: Readonly<IConfig>
  public readonly mode: NodeEnv

  createTypeOrmOptions() {
    return this.config.database
  }

  constructor() {
    this.mode = parseNodeEnv(process.env.NODE_ENV)
    this.config = require(path.join(
      __dirname,
      `../../config/${this.mode}.json`
    ))
  }

  get isDevMode() {
    return this.mode === NodeEnv.Development
  }
}
