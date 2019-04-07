import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AppController } from "./app.controller"
import { ConfigModule } from "./config/config.module"
import { WwwModule } from "./www/www.module"
import { AccountModule } from "./account/account.module"
import { ConfigService } from "./config/config.service"
import { MainModule } from "./main/main.module"
import { MediaModule } from "./media/media.module"
import { AdminModule } from "./admin/admin.module"

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useExisting: ConfigService
    }),
    AccountModule,
    WwwModule,
    MediaModule,
    MainModule,
    AdminModule
  ],
  controllers: [AppController]
})
export class AppModule {}
