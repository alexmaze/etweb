import { Controller, Get, Render, Inject, Headers, Param } from "@nestjs/common"
import { LanguageType, VariableKeys } from "../main/variable.entity"
import { ETWEB_LANGUAGE } from "./language.middleware"
import { WebPosition, CommonService } from "./services/common.service"

@Controller("/contact")
export class ContactController {
  @Inject()
  commonServ: CommonService

  @Get("/")
  @Render("contact")
  async index(@Headers(ETWEB_LANGUAGE) lang: LanguageType) {
    const common = await this.commonServ.getCommonData(lang, WebPosition.Jobs)

    const ret = {
      ...common,
      title: common.variables[VariableKeys.Name].value,
      address: common.variables[VariableKeys.Address].value,
      contact: common.variables[VariableKeys.Contact].value,
      mobile: common.variables[VariableKeys.Mobile].value,
      tel: common.variables[VariableKeys.Tel].value,
      email: common.variables[VariableKeys.Email].value,
      texts: {
        page_title: lang === LanguageType.English ? "Contact Us" : "联系我们",
        address: lang === LanguageType.Chinese ? "地址" : "Address",
        contact: lang === LanguageType.Chinese ? "联系人" : "Contact",
        mobile: lang === LanguageType.Chinese ? "手机" : "Mobile",
        tel: lang === LanguageType.Chinese ? "座机/传真" : "Tel/Fax",
        email: lang === LanguageType.Chinese ? "邮箱" : "Email"
      }
    }

    return ret
  }
}
