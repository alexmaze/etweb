import {
  Controller,
  Get,
  Body,
  Inject,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
  Post
} from "@nestjs/common"
import { BannerService } from "../main/banner.service"
import { BannerEntity } from "../main/banner.entity"

@Controller("/api/admin/banner")
export class BannerController {
  @Inject()
  service: BannerService

  @Get("/")
  // @UseGuards(AuthGuard())
  list() {
    return this.service.all()
  }

  @Post("/")
  create(@Body() data: BannerEntity) {
    return this.service.create(data)
  }

  @Get("/:id")
  show(@Param("id", ParseIntPipe) id: number) {
    return this.service.show(id)
  }

  @Patch("/:id")
  update(@Param("id", ParseIntPipe) id, @Body() data: BannerEntity) {
    data.id = id
    return this.service.update(data)
  }

  @Delete("/:id")
  remove(@Param("id", ParseIntPipe) id) {
    return this.service.remove(id)
  }
}
