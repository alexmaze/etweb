import { LanguageType, VariableKeys } from "src/main/variable.entity"
import { Injectable, Inject } from "@nestjs/common"
import { VariableService } from "src/main/variable.service"

export enum WebPosition {
  Index = "index",
  About = "about",
  Product = "product",
  Look = "look",
  News = "news",
  Jobs = "jobs",
  Contact = "contact"
}

const menuTextMap = {
  [WebPosition.Index]: {
    [LanguageType.Chinese]: "首页",
    [LanguageType.English]: "Index"
  },
  [WebPosition.About]: {
    [LanguageType.Chinese]: "关于我们",
    [LanguageType.English]: "About Us"
  },
  [WebPosition.Product]: {
    [LanguageType.Chinese]: "产品中心",
    [LanguageType.English]: "Products"
  },
  [WebPosition.Look]: {
    [LanguageType.Chinese]: "制造实力",
    [LanguageType.English]: "Factory"
  },
  [WebPosition.News]: {
    [LanguageType.Chinese]: "新闻资讯",
    [LanguageType.English]: "News"
  },
  [WebPosition.Jobs]: {
    [LanguageType.Chinese]: "加入我们",
    [LanguageType.English]: "Join Us"
  },
  [WebPosition.Contact]: {
    [LanguageType.Chinese]: "联系我们",
    [LanguageType.English]: "Contacts"
  }
}

@Injectable()
export class CommonService {
  @Inject()
  variableServ: VariableService

  async getCommonData(language: LanguageType, position: WebPosition) {
    const variables = await this.variableServ.allAsMap(language)

    const ret = {
      language,
      position,
      header: getHeaderData(language, position),
      footer: getFooterData(language, position),
      title: `${variables[VariableKeys.Name].value} - ${
        menuTextMap[position][language]
      }`,
      variables
    }

    return ret
  }
}

export function getHeaderData(lang: LanguageType, position: WebPosition) {
  const positions = Object.values(WebPosition) as WebPosition[]

  return {
    menu: positions.map(p => ({
      key: p,
      text: menuTextMap[p][lang],
      selected: p === position
    }))
  }
}

export function getFooterData(lang: LanguageType, position: WebPosition) {
  return null
}
