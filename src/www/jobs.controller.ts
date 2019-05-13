import {
  Controller,
  Get,
  Render,
  Inject,
  Headers,
  Param,
  ParseIntPipe
} from "@nestjs/common"
import { LanguageType } from "../main/variable.entity"
import { ETWEB_LANGUAGE } from "./language.middleware"
import { WebPosition, CommonService } from "./services/common.service"
import { PositionService } from "../main/position.service"

@Controller("/jobs")
export class JobsController {
  @Inject()
  commonServ: CommonService

  @Inject()
  positionServ: PositionService

  @Get("/:id?")
  @Render("jobs")
  async index(
    @Headers(ETWEB_LANGUAGE) lang: LanguageType,
    @Param("id") idStr: string
  ) {
    const common = await this.commonServ.getCommonData(lang, WebPosition.Jobs)

    const data = await this.positionServ.list({ page: 1, size: 1000 }, lang)

    let selected

    if (data && data.data) {
      if (idStr == null) {
        selected = data.data[0] || {}
        selected.selected = true
      } else {
        const id = parseInt(idStr, 10)
        selected = data.data.find(i => i.id === id) || {}
        selected.selected = true
      }
    }

    const ret = {
      ...common,
      texts: {
        page_title: lang === LanguageType.English ? "Join Us" : "加入我们",
        menu_title: lang === LanguageType.English ? "Job List" : "职位列表",
        page_sub_title:
          lang === LanguageType.English ? "Job Detail" : "职位详情",
        contact_us: lang === LanguageType.English ? "contact_us" : "联系我们"
      },
      selected,
      items: data.data
    }

    return ret
  }
}
