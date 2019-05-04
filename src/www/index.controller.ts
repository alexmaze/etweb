import { Controller, Get, Render, Inject, Headers } from "@nestjs/common"
import { VariableService } from "../main/variable.service"
import {
  VariableKeys,
  VariableEntity,
  LanguageType
} from "../main/variable.entity"
import { BannerService } from "../main/banner.service"
import { ProductService } from "src/main/product.service"
import { ArticleService } from "src/main/article.service"
import { ArticleType } from "src/main/article.entity"
import { ETWEB_LANGUAGE } from "./language.middleware"
import {
  getFooterData,
  getHeaderData,
  WebPosition,
  CommonService
} from "./services/common.service"

@Controller("/")
export class IndexController {
  @Inject()
  commonServ: CommonService

  @Inject()
  bannerServ: BannerService

  @Inject()
  productServ: ProductService

  @Inject()
  articleServ: ArticleService

  @Get()
  @Render("index")
  async root(@Headers(ETWEB_LANGUAGE) lang: LanguageType) {
    const common = await this.commonServ.getCommonData(lang, WebPosition.Index)
    const ret = {
      ...common,
      intro: {
        title: common.variables.index_2_title.value,
        subTitle: common.variables.index_2_sub_title.value,
        imageUrl: common.variables.index_2_photo.resource.rawUrl,
        text: common.variables.index_2_text.value,
        _more: lang === LanguageType.English ? "More" : "了解更多",
        _link_1: lang === LanguageType.English ? "Culture" : "企业文化",
        _link_1_sub:
          lang === LanguageType.English
            ? "People Oriented & Win-Win"
            : "以人为本 互惠双赢",
        _link_2: lang === LanguageType.English ? "Awards" : "荣誉资质",
        _link_2_sub:
          lang === LanguageType.English
            ? "Advanced Company"
            : "先进单位 认证证书"
      },
      banners: await this.bannerServ.all(lang),
      products: await this.productServ.list({ page: 1, size: 16 }),
      news: await this.articleServ.list({ page: 1, size: 16 }, ArticleType.News)
    }

    console.log(JSON.stringify(ret, null, 2))

    return ret
  }
}
