import { Controller, Get, Render, Inject, Headers } from "@nestjs/common"
import { LanguageType, VariableKeys } from "../main/variable.entity"
import { ETWEB_LANGUAGE } from "./language.middleware"
import { WebPosition, CommonService } from "./services/common.service"
import { HonorService } from "src/main/honor.service"

@Controller("/about")
export class AboutController {
  @Inject()
  commonServ: CommonService

  @Inject()
  honorServ: HonorService

  @Get("/")
  @Render("about")
  async root(@Headers(ETWEB_LANGUAGE) lang: LanguageType) {
    const common = await this.commonServ.getCommonData(lang, WebPosition.About)

    const ret = {
      ...common,
      menu_title: lang === LanguageType.English ? "About Us" : "关于我们",
      menu: [
        {
          title: lang === LanguageType.English ? "Introduction" : "公司简介",
          href: "/about",
          selected: true
        },
        {
          title: lang === LanguageType.English ? "Honors" : "荣誉资质",
          href: "/honor",
          selected: false
        }
      ],
      intro: {
        title: lang === LanguageType.English ? "Introduction" : "公司简介",
        content: common.variables[VariableKeys.AboutUs].value
      }
    }

    return ret
  }
}
