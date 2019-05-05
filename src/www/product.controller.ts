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
import { HonorService } from "src/main/honor.service"
import { ProductService } from "src/main/product.service"

@Controller("/product")
export class ProductController {
  @Inject()
  commonServ: CommonService

  @Inject()
  productServ: ProductService

  @Get("/:id")
  @Render("product")
  async detail(
    @Headers(ETWEB_LANGUAGE) lang: LanguageType,
    @Param("id", ParseIntPipe) id: number
  ) {
    return this.renderById(lang, id)
  }

  @Get("/")
  @Render("product")
  async index(@Headers(ETWEB_LANGUAGE) lang: LanguageType) {
    return this.renderById(lang)
  }

  async renderById(lang: LanguageType, id?: number) {
    const common = await this.commonServ.getCommonData(
      lang,
      WebPosition.Product
    )

    const products = await this.productServ.list({ page: 1, size: 1000 }, lang)
    let selected = {} as any

    if (products && products.data) {
      if (id == null) {
        selected = products.data[0] || {}
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

    return ret
  }
}
