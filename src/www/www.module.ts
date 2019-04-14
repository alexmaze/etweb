import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod
} from "@nestjs/common"
import { MediaModule } from "../media/media.module"
import { MainModule } from "../main/main.module"
import { IndexController } from "./index.controller"
import { LanguageMiddleware } from "./language.middleware"

import * as cookieParser from "cookie-parser"

@Module({
  imports: [MainModule, MediaModule],
  controllers: [IndexController]
})
export class WwwModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieParser(), LanguageMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL })
  }
}
