import {
  Controller,
  Get,
  Body,
  Inject,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
  Post,
  Query
} from "@nestjs/common"
import { ProductService } from "../main/product.service"
import { ProductEntity } from "../main/product.entity"
import { IPageReq } from "../lib/page"

@Controller("/api/admin/product")
export class ProductController {
  @Inject()
  service: ProductService

  @Get("/")
  // TODO @UseGuards(AuthGuard())
  list(
    @Query()
    query: IPageReq
  ) {
    return this.service.list(query)
  }

  @Post("/")
  create(@Body() data: ProductEntity) {
    return this.service.create(data)
  }

  @Get("/:id")
  show(@Param("id", ParseIntPipe) id: number) {
    return this.service.show(id)
  }

  @Patch("/:id")
  update(@Param("id", ParseIntPipe) id, @Body() data: ProductEntity) {
    data.id = id
    return this.service.update(data)
  }

  @Delete("/:id")
  remove(@Param("id", ParseIntPipe) id) {
    return this.service.remove(id)
  }
}
