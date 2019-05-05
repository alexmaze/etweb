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
import { CommonService } from "./services/common.service"
import { AboutController } from "./about.controller"

@Module({
  imports: [MainModule, MediaModule],
  providers: [CommonService],
  controllers: [IndexController, AboutController]
})
export class WwwModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieParser(), LanguageMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL })
  }
}
