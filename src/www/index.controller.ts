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
    const ret = {
      ...(await this.commonServ.getCommonData(lang, WebPosition.Index)),
      banners: await this.bannerServ.all(),
      products: await this.productServ.list({ page: 1, size: 16 }),
      news: await this.articleServ.list({ page: 1, size: 16 }, ArticleType.News)
    }

    return ret
  }
}
