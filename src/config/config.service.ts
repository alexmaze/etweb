import { Injectable } from "@nestjs/common"
import * as path from "path"

export interface IConfig {
  name: string
  server: {
    port: number
    address: string
  }
}

@Injectable()
export class ConfigService {
  public config: Readonly<IConfig>
  public readonly mode: NodeEnv

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

enum NodeEnv {
  Production = "production",
  Development = "development"
}

function parseNodeEnv(value: string) {
  switch (value) {
    case NodeEnv.Production:
      return NodeEnv.Production
    case NodeEnv.Development:
      return NodeEnv.Development
    default:
      return NodeEnv.Development
  }
}
