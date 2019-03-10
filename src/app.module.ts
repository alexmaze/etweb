import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ConfigService } from "./config/config.service"
import { ConfigModule } from "./config/config.module"
import { WwwModule } from './www/www.module';

@Module({
  imports: [ConfigModule, WwwModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
