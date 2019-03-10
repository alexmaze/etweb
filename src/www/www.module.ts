import { Module } from "@nestjs/common"
import { WwwController } from "./www.controller"

@Module({
  controllers: [WwwController]
})
export class WwwModule {}
