import {
  Controller,
  Get,
  Render,
  Inject,
  Headers,
  Param,
  ParseIntPipe
} from "@nestjs/common"
import { LanguageType, VariableKeys } from "../main/variable.entity"
import { ETWEB_LANGUAGE } from "./language.middleware"
import { WebPosition, CommonService } from "./services/common.service"
import { ArticleService } from "src/main/article.service"

@Controller("/article")
export class ArticleController {
  @Inject()
  commonServ: CommonService

  @Inject()
  articleServ: ArticleService

  @Get("/")
  @Render("article")
  async index(@Headers(ETWEB_LANGUAGE) lang: LanguageType) {
    const common = await this.commonServ.getCommonData(lang, WebPosition.News)

    const ret = {
      ...common,
      pageTitle: lang === LanguageType.English ? "News & Share" : "新闻资讯"
    }

    return ret
  }

  @Get("/:id")
  @Render("article-detail")
  async detail(
    @Headers(ETWEB_LANGUAGE) lang: LanguageType,
    @Param("id", ParseIntPipe) id: number
  ) {
    const common = await this.commonServ.getCommonData(lang, WebPosition.News)
    const data = await this.articleServ.show(id)

    const ret = {
      ...common,
      data
    }

    return ret
  }
}
