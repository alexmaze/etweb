import { Module } from "@nestjs/common"
import { MediaModule } from "../media/media.module"
import { MainModule } from "../main/main.module"
import { IndexController } from "./index.controller"

@Module({
  imports: [MainModule, MediaModule],
  controllers: [IndexController]
})
export class WwwModule {}
