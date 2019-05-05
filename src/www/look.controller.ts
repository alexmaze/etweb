import { Controller, Get, Render, Inject, Headers, Param } from "@nestjs/common"
import { LanguageType, VariableKeys } from "../main/variable.entity"
import { ETWEB_LANGUAGE } from "./language.middleware"
import { WebPosition, CommonService } from "./services/common.service"
import { LookService } from "src/main/look.service"
import { LookType } from "src/main/look.entity"

@Controller("/look")
export class LookController {
  @Inject()
  commonServ: CommonService

  @Inject()
  lookServ: LookService

  @Get("/:type?")
  @Render("look")
  async root(
    @Headers(ETWEB_LANGUAGE) lang: LanguageType,
    @Param("type") type: LookType
  ) {
    type = type || LookType.Factory

    const common = await this.commonServ.getCommonData(lang, WebPosition.Look)

    const ret = {
      ...common,
      menu_title: lang === LanguageType.English ? "Photos" : "制造实力",
      menu: [
        {
          title: lang === LanguageType.English ? "Factory" : "厂房容貌",
          href: `/look/${LookType.Factory}`,
          selected: type === LookType.Factory
        },
        {
          title: lang === LanguageType.English ? "Command Center" : "控制中心",
          href: `/look/${LookType.CommandCenter}`,
          selected: type === LookType.CommandCenter
        },
        {
          title: lang === LanguageType.English ? "Transport" : "物流运输",
          href: `/look/${LookType.Transport}`,
          selected: type === LookType.Transport
        }
      ],
      selected: null,
      items: []
    }

    ret.selected = ret.menu.find(v => v.selected)
    const looks = await this.lookServ.list({ page: 1, size: 1000 }, type, lang)
    ret.items = (looks && looks.data) || []

    return ret
  }
}
