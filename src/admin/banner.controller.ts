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
import { BannerService } from "src/main/banner.service"
import { BannerEntity } from "src/main/banner.entity"
import { create } from "domain"

@Controller("/api/admin/banner")
export class BannerController {
  @Inject()
  bannerService: BannerService

  @Get("/")
  list() {
    return this.bannerService.all()
  }

  @Post("/")
  create(@Body() data: BannerEntity) {
    return this.bannerService.create(data)
  }

  @Get("/:id")
  show(@Param("id", ParseIntPipe) id: number) {
    return this.bannerService.show(id)
  }

  @Patch("/:id")
  update(@Param("id", ParseIntPipe) id, @Body() data: BannerEntity) {
    data.id = id
    return this.bannerService.update(data)
  }

  @Delete("/:id")
  remove(@Param("id", ParseIntPipe) id) {
    return this.bannerService.remove(id)
  }
}
