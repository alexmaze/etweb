import { Module } from "@nestjs/common"
import { SessionController } from "./session.controller"
import { JwtModule } from "@nestjs/jwt"
import { AuthService } from "./auth.service"
import { JwtStrategy } from "./jwt.strategy"
import { PassportModule } from "@nestjs/passport"
import { MainModule } from "../main/main.module"
import { AccountModule } from "src/account/account.module"
import { ConfigService } from "src/config/config.service"
import { ArticleController } from "./article.controller"
import { ResourceController } from "./resource.controller"
import { MediaModule } from "src/media/media.module"
import { BannerController } from "./banner.controller"
import { VariableController } from "./variable.controller"

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
    VariableController
  ]
})
export class AdminModule {}
