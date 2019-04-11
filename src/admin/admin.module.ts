import { Module } from "@nestjs/common"
import { SessionController } from "./session.controller"
import { JwtModule } from "@nestjs/jwt"
import { AuthService } from "./auth.service"
import { JwtStrategy } from "./jwt.strategy"
import { PassportModule } from "@nestjs/passport"
import { MainModule } from "../main/main.module"
import { AccountModule } from "../account/account.module"
import { ConfigService } from "../config/config.service"
import { ArticleController } from "./article.controller"
import { ResourceController } from "./resource.controller"
import { MediaModule } from "../media/media.module"
import { BannerController } from "./banner.controller"
import { VariableController } from "./variable.controller"
import { HonorController } from "./honor.controller"
import { LookController } from "./look.controller"
import { ProductController } from "./product.controller"
import { PositionController } from "./position.controller"

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt", session: true }),
    JwtModule.registerAsync({
      useExisting: ConfigService
    }),
    MainModule,
    MediaModule,
    AccountModule
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [
    SessionController,
    ArticleController,
    ResourceController,
    BannerController,
    VariableController,
    HonorController,
    LookController,
    ProductController,
    PositionController
  ]
})
export class AdminModule {}
