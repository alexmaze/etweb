import { LanguageType, VariableKeys } from "src/main/variable.entity"
import { Injectable, Inject } from "@nestjs/common"
import { VariableService } from "src/main/variable.service"

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

export enum WebPosition {
  Index = "index",
  About = "about",
  Product = "product",
  Look = "look",
  News = "article",
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

const menuSubMenuMap = {
  [WebPosition.About]: [
    {
      text: {
        [LanguageType.Chinese]: "公司简介",
        [LanguageType.English]: "Introduction"
      }
    },
    {
      text: {
        [LanguageType.Chinese]: "荣誉资质",
        [LanguageType.English]: "Awards"
      }
    }
  ],
  [WebPosition.Product]: [],
  [WebPosition.Look]: [
    {
      text: {
        [LanguageType.Chinese]: "厂房容貌",
        [LanguageType.English]: "Workshop"
      }
    },
    {
      text: {
        [LanguageType.Chinese]: "控制中心",
        [LanguageType.English]: "Command Center"
      }
    },
    {
      text: {
        [LanguageType.Chinese]: "物流运输",
        [LanguageType.English]: "Transportation"
      }
    }
  ],
  [WebPosition.Contact]: [
    {
      text: {
        [LanguageType.Chinese]: "24小时咨询热线：0511-86612753",
        [LanguageType.English]: "24H Phone: 0511-86612753"
      }
    },
    {
      text: {
        [LanguageType.Chinese]: "地址：丹阳市皇塘镇蒋墅河滨南路60号",
        [LanguageType.English]: "Addr: NO.60 South Hebin RD. Danyang City"
      }
    }
  ]
}

export function getHeaderData(lang: LanguageType, position: WebPosition) {
  const positions = Object.values(WebPosition) as WebPosition[]

  return {
    menu: positions.map(p => ({
      path: `/${p === "index" ? "" : p}`,
      key: p,
      text: menuTextMap[p][lang],
      selected: p === position
    }))
  }
}

export function getFooterData(lang: LanguageType, position: WebPosition) {
  const positions = Object.values(WebPosition) as WebPosition[]

  const wechatText = {
    [LanguageType.Chinese]: "欢迎关注微信公众号",
    [LanguageType.English]: "Subscribe Wechat"
  }

  return {
    wechat: wechatText[lang],
    menu: positions.map(p => {
      let items = []
      if (menuSubMenuMap[p] && menuSubMenuMap[p].length > 0) {
        items = menuSubMenuMap[p].map(i => {
          return {
            text: i.text[lang]
          }
        })
      }

      return {
        key: p,
        text: menuTextMap[p][lang],
        selected: p === position,
        items
      }
    })
  }
}
