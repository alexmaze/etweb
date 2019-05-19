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
import { ProductController } from "./product.controller"
import { LookController } from "./look.controller"
import { ArticleController } from "./article.controller"
import { JobsController } from "./jobs.controller"
import { ContactController } from "./contact.controller"
import { DeviceMiddleware } from "./device.middleware"

@Module({
  imports: [MainModule, MediaModule],
  providers: [CommonService],
  controllers: [
    IndexController,
    AboutController,
    ProductController,
    LookController,
    ArticleController,
    JobsController,
    ContactController
  ]
})
export class WwwModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieParser(), LanguageMiddleware, DeviceMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL })
  }
}
