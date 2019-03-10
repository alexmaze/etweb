import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { ConfigModule } from "./config/config.module"
import { WwwModule } from "./www/www.module"

@Module({
  imports: [ConfigModule, WwwModule],
  controllers: [AppController]
})
export class AppModule {}
