import { Controller, Get, Inject } from "@nestjs/common"
import * as qiniu from "qiniu"
import { ConfigService } from "./config/config.service"
import { MediaService } from "./media/media.service"

@Controller()
export class AppController {
  constructor(private readonly mediaService: MediaService) {}

  @Get("/ping")
  async ping(): Promise<any> {
    // const data = await this.mediaService.statFile()

    const key = "850x10000.jpg"
    const url = this.mediaService.getPublicUrl(key)

    return url
  }
}
