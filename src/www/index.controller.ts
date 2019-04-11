import { Controller, Get, Render, Inject } from "@nestjs/common"
import { VariableService } from "../main/variable.service"
import { VariableKeys, VariableEntity } from "../main/variable.entity"
import { BannerService } from "../main/banner.service"

@Controller("/")
export class IndexController {
  @Inject()
  variableServ: VariableService

  @Inject()
  bannerServ: BannerService

  @Get()
  @Render("index")
  async root() {
    const ret = {
      variables: await this.variableServ.allAsMap(),
      banners: await this.bannerServ.all()
    }

    return ret
  }
}
