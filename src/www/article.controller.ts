import {
  Controller,
  Get,
  Render,
  Inject,
  Headers,
  Param,
  ParseIntPipe,
  Query
} from "@nestjs/common"
import { LanguageType, VariableKeys } from "../main/variable.entity"
import { ETWEB_LANGUAGE } from "./language.middleware"
import { WebPosition, CommonService } from "./services/common.service"
import { ArticleService } from "src/main/article.service"
import { ArticleType } from "src/main/article.entity"
import { IPageRes } from "src/lib/page"

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
        item.content = item.content
          .replace(/<[^>]+>|&[^>]+;/g, "")
          .trim()
          .substr(0, 100)
      }
      item._createdAt = item.createdAt.toISOString().substr(0, 10)
    })
    shares.data.forEach((item: any) => {
      if (item.content) {
        item.content = item.content
          .replace(/<[^>]+>|&[^>]+;/g, "")
          .trim()
          .substr(0, 100)
      }
      item._createdAt = item.createdAt.toISOString().substr(0, 10)
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

    return ret
  }

  @Get("/news")
  @Render("article-news")
  async newsPage(
    @Headers(ETWEB_LANGUAGE) lang: LanguageType,
    @Query("page") page: string,
    @Query("size") size: string
  ) {
    const common = await this.commonServ.getCommonData(lang, WebPosition.News)

    page = page || "1"
    size = size || "10"

    const data = await this.articleServ.list(
      { page: parseInt(page, 10), size: parseInt(size, 10) },
      ArticleType.News,
      lang
    )

    data.data.forEach((item: any) => {
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
      pageTitle: lang === LanguageType.English ? "News" : "新闻资讯",
      data,
      menu: [
        {
          title: lang === LanguageType.English ? "News" : "新闻资讯",
          href: "/article/news",
          selected: true
        },
        {
          title: lang === LanguageType.English ? "Share" : "经验分享",
          href: "/article/share",
          selected: false
        }
      ],
      pagination: getPagination(data, lang, "/article/news"),
      _top: lang === LanguageType.English ? "STICK" : "置顶"
    } as any

    return ret
  }

  @Get("/share")
  @Render("article-share")
  async sharePage(
    @Headers(ETWEB_LANGUAGE) lang: LanguageType,
    @Query("page") page: string,
    @Query("size") size: string
  ) {
    const common = await this.commonServ.getCommonData(lang, WebPosition.News)

    page = page || "1"
    size = size || "10"

    const data = await this.articleServ.list(
      { page: parseInt(page, 10), size: parseInt(size, 10) },
      ArticleType.Share,
      lang
    )

    data.data.forEach((item: any) => {
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
      pageTitle: lang === LanguageType.English ? "Share" : "经验分享",
      data,
      menu: [
        {
          title: lang === LanguageType.English ? "News" : "新闻资讯",
          href: "/article/news",
          selected: false
        },
        {
          title: lang === LanguageType.English ? "Share" : "经验分享",
          href: "/article/share",
          selected: true
        }
      ],
      pagination: getPagination(data, lang, "/article/share"),
      _top: lang === LanguageType.English ? "STICK" : "置顶"
    } as any

    return ret
  }

  @Get("/detail/:id")
  @Render("article-detail")
  async detail(
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
      data,
      others: others.data,
      _others: lang === LanguageType.English ? "Others" : "其他资讯",
      _top: lang === LanguageType.English ? "STICK" : "置顶"
    }

    return ret
  }
}

function getPagination(data: IPageRes<any>, lang: LanguageType, url: string) {
  console.log(data.page, data.size, data.total)
  return {
    preText: lang === LanguageType.English ? "Pre" : "上一页",
    nextText: lang === LanguageType.English ? "Next" : "下一页",
    hasNext: data.page * data.size < data.total,
    hasPre: data.page > 1,
    preUrl: `${url}?page=${data.page - 1}&size=${data.size}`,
    nextUrl: `${url}?page=${data.page + 1}&size=${data.size}`
  }
}
