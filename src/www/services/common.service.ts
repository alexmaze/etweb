import {
  LanguageType,
  VariableKeys,
  VariableEntity
} from "../../main/variable.entity"
import { Injectable, Inject } from "@nestjs/common"
import { VariableService } from "../../main/variable.service"

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
      footer: getFooterData(language, position, variables),
      title: `${variables[VariableKeys.Name].value} - ${
        menuTextMap[position][language]
      }`,
      subTitle: menuTextMap[position][language],
      favicon: variables[VariableKeys.Favicon],
      logo: variables[VariableKeys.Logo],
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

export function getHeaderData(lang: LanguageType, position: WebPosition) {
  const toTopText = {
    [LanguageType.Chinese]: "返回顶部",
    [LanguageType.English]: "TO TOP"
  }

  const positions = [
    WebPosition.Index,
    WebPosition.About,
    WebPosition.Product,
    WebPosition.News,
    WebPosition.Jobs,
    WebPosition.Contact
  ]

  return {
    toTop: toTopText[lang],
    menu: positions.map(p => ({
      path: `/${p === "index" ? "" : p}`,
      key: p,
      text: menuTextMap[p][lang],
      selected: p === position
    }))
  }
}

export function getFooterData(
  lang: LanguageType,
  position: WebPosition,
  variables: {
    [key: string]: VariableEntity
  }
) {
  const positions = [
    WebPosition.Index,
    WebPosition.About,
    WebPosition.Product,
    WebPosition.News,
    WebPosition.Jobs,
    WebPosition.Contact
  ]
  // const positions = Object.values(WebPosition) as WebPosition[]

  const wechatText = {
    [LanguageType.Chinese]: "欢迎关注微信公众号",
    [LanguageType.English]: "Subscribe Wechat"
  }

  const menuSubMenuMap = {
    [WebPosition.About]: [
      // {
      //   path: "",
      //   text: {
      //     [LanguageType.Chinese]: "公司简介",
      //     [LanguageType.English]: "Introduction"
      //   }
      // },
      // {
      //   path: "/qualification",
      //   text: {
      //     [LanguageType.Chinese]: "荣誉资质",
      //     [LanguageType.English]: "Awards"
      //   }
      // }
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
          [LanguageType.Chinese]:
            "24小时咨询热线：" + variables[VariableKeys.Tel].value,
          [LanguageType.English]:
            "24H Phone: " + variables[VariableKeys.Tel].value
        }
      },
      {
        text: {
          [LanguageType.Chinese]:
            "地址：" + variables[VariableKeys.Address].value,
          [LanguageType.English]:
            "Addr: " + variables[VariableKeys.Address].value
        }
      }
    ]
  }

  return {
    wechat: wechatText[lang],
    menu: positions.map(p => {
      let items = []
      if (menuSubMenuMap[p] && menuSubMenuMap[p].length > 0) {
        items = menuSubMenuMap[p].map(i => {
          return {
            path: i.path,
            text: i.text[lang]
          }
        })
      }

      return {
        path: `/${p === "index" ? "" : p}`,
        key: p,
        text: menuTextMap[p][lang],
        selected: p === position,
        items
      }
    })
  }
}
