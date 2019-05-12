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
import { ArticleType } from "src/main/article.entity"

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

    const news = await this.articleServ.list(
      { page: 1, size: 2 },
      ArticleType.News,
      lang
    )
    const shares = await this.articleServ.list(
      { page: 1, size: 5 },
      ArticleType.Share,
      lang
    )

    news.data.forEach((item: any) => {
      if (item.content) {
        item.content = item.content.replace(/<[^>]+>|&[^>]+;/g, "").trim()
        item._createdAt = item.createdAt
          .toISOString()
          .substr(0, 10)
          .substr(0, 100)
      }
    })
    shares.data.forEach((item: any) => {
      if (item.content) {
        item.content = item.content.replace(/<[^>]+>|&[^>]+;/g, "").trim()
        item._createdAt = item.createdAt
          .toISOString()
          .substr(0, 10)
          .substr(0, 100)
      }
    })

    const [s1, s2, s3, ...otherShares] = shares.data

    const ret = {
      ...common,
      pageTitle: lang === LanguageType.English ? "News & Share" : "新闻资讯",
      news: news.data,
      sharesTop: [s1, s2, s3],
      sharesLeft: otherShares,
      _share: lang === LanguageType.English ? "Shares" : "经验分享",
      _more: lang === LanguageType.English ? "More" : "加载更多",
      _top: lang === LanguageType.English ? "STICK" : "置顶"
    } as any

    ret._data = JSON.stringify(ret)

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

    data.viewCount++
    this.articleServ.update(data)

    const ret = {
      ...common,
      data
    }

    return ret
  }
}
