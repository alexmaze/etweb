import {
  Controller,
  Get,
  Inject,
  Headers,
  Param,
  ParseIntPipe,
  Res
} from "@nestjs/common"
import { LanguageType } from "../main/variable.entity"
import { ETWEB_LANGUAGE } from "./language.middleware"
import { WebPosition, CommonService } from "./services/common.service"
import { ProductService } from "../main/product.service"
import { ETWEB_DEVICE, DeviceType } from "./device.middleware"
import { Response } from "express"

@Controller("/product")
export class ProductController {
  @Inject()
  commonServ: CommonService

  @Inject()
  productServ: ProductService

  @Get("/:id")
  async detail(
    @Res() res: Response,
    @Headers(ETWEB_DEVICE) device: DeviceType,
    @Headers(ETWEB_LANGUAGE) lang: LanguageType,
    @Param("id", ParseIntPipe) id: number
  ) {
    return this.renderById(res, device, lang, id)
  }

  @Get("/")
  async index(
    @Res() res: Response,
    @Headers(ETWEB_DEVICE) device: DeviceType,
    @Headers(ETWEB_LANGUAGE) lang: LanguageType
  ) {
    return this.renderById(res, device, lang)
  }

  async renderById(
    res: Response,
    device: DeviceType,
    lang: LanguageType,
    id?: number
  ) {
    const common = await this.commonServ.getCommonData(
      lang,
      WebPosition.Product
    )

    const products = await this.productServ.list({ page: 1, size: 1000 }, lang)
    let selected = {} as any

    if (products && products.data) {
      if (id == null) {
        selected = products.data[0] || {}
        selected.selected = true
      } else {
        selected = products.data.find(i => i.id === id) || {}
        selected.selected = true
      }
    }

    const ret = {
      ...common,
      menu_title: lang === LanguageType.English ? "Products" : "产品列表",
      detail_title: lang === LanguageType.English ? "Detail" : "产品详情",
      items: (products && products.data) || [],
      selected,
      _contact_us: lang === LanguageType.English ? "Contact Us" : "联系我们"
    }

    return res.render(
      device === DeviceType.Desktop ? "product" : "mobile/product",
      ret
    )
  }
}
