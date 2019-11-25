import {
  Controller,
  Get,
  Inject,
  Headers,
  Param,
  ParseIntPipe,
  Query,
  Res
} from "@nestjs/common"
import { LanguageType } from "../main/variable.entity"
import { ETWEB_LANGUAGE } from "./language.middleware"
import { WebPosition, CommonService } from "./services/common.service"
import { ArticleService } from "../main/article.service"
import { ArticleType } from "../main/article.entity"
import { IPageRes } from "../lib/page"
import { DeviceType, ETWEB_DEVICE } from "./device.middleware"
import { Response } from "express"

@Controller("/article")
export class ArticleController {
  @Inject()
  commonServ: CommonService

  @Inject()
  articleServ: ArticleService

  @Get("/")
  async index(
    @Res() res: Response,
    @Headers(ETWEB_DEVICE) device: DeviceType,
    @Headers(ETWEB_LANGUAGE) lang: LanguageType
  ) {
    const defaultPageSize = 6

    const common = await this.commonServ.getCommonData(lang, WebPosition.News)

    const news = await this.articleServ.list(
      { page: 1, size: defaultPageSize },
      ArticleType.News,
      lang
    )

    news.data.forEach((item: any) => {
      if (item.content) {
        item.content = item.content
          .replace(/<[^>]+>|&[^>]+;/g, "")
          .trim()
          .substr(0, 100)
      }
      item._createdAt = item.createdAt.toISOString().substr(0, 10)
    })

    const ret = {
      ...common,
      pageTitle: lang === LanguageType.English ? "News & Share" : "新闻资讯",
      news: news.data,
      hasMore: news.total > defaultPageSize,
      _more: lang === LanguageType.English ? "More" : "加载更多",
      _top: lang === LanguageType.English ? "STICK" : "置顶"
    } as any

    return res.render(
      device === DeviceType.Desktop ? "article" : "mobile/article",
      ret
    )
  }

  @Get("/api/list")
  async newsPage(
    @Res() res: Response,
    @Headers(ETWEB_DEVICE) device: DeviceType,
    @Headers(ETWEB_LANGUAGE) lang: LanguageType,
    @Query("page") page: string,
    @Query("size") size: string
  ) {
    page = page || "1"
    size = size || "6"

    const ret = await this.articleServ.list(
      { page: parseInt(page, 10), size: parseInt(size, 10) },
      ArticleType.News,
      lang
    )

    ret.data.forEach((item: any) => {
      if (item.content) {
        item.content = item.content
          .replace(/<[^>]+>|&[^>]+;/g, "")
          .trim()
          .substr(0, 100)
      }
      item._createdAt = item.createdAt.toISOString().substr(0, 10)
    })

    ret["_top"] = lang === LanguageType.English ? "STICK" : "置顶"

    return res.json(ret)
  }

  @Get("/detail/:id")
  async detail(
    @Res() res: Response,
    @Headers(ETWEB_DEVICE) device: DeviceType,
    @Headers(ETWEB_LANGUAGE) lang: LanguageType,
    @Param("id", ParseIntPipe) id: number
  ) {
    const common = await this.commonServ.getCommonData(lang, WebPosition.News)
    const data: any = await this.articleServ.show(id)

    const others = await this.articleServ.list(
      { page: 1, size: 3 },
      data.type,
      lang
    )
    others.data.forEach((item: any) => {
      if (item.content) {
        item.content = item.content
          .replace(/<[^>]+>|&[^>]+;/g, "")
          .trim()
          .substr(0, 100)
      }
    })

    data.viewCount++
    this.articleServ.update(data)

    data._createdAt = data.createdAt.toISOString().substr(0, 10)

    const ret = {
      ...common,
      data: {
        ...data,
        title: lang === LanguageType.English ? data.titleEn : data.title,
        subTitle:
          lang === LanguageType.English ? data.subTitleEn : data.subTitle,
        content: lang === LanguageType.English ? data.contentEn : data.content
      },
      others: others.data,
      _others: lang === LanguageType.English ? "Others" : "其他资讯",
      _top: lang === LanguageType.English ? "STICK" : "置顶"
    }

    return res.render(
      device === DeviceType.Desktop
        ? "article-detail"
        : "mobile/article-detail",
      ret
    )
  }
}
