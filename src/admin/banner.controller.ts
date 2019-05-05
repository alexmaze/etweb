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
  UseGuards
} from "@nestjs/common"
import { BannerService } from "../main/banner.service"
import { BannerEntity } from "../main/banner.entity"
import { AuthGuard } from "@nestjs/passport"

@Controller("/api/admin/banner")
export class BannerController {
  @Inject()
  service: BannerService

  @Get("/")
  @UseGuards(AuthGuard())
  list() {
    return this.service.all()
  }

  @Post("/")
  @UseGuards(AuthGuard())
  create(@Body() data: BannerEntity) {
    return this.service.create(data)
  }

  @Get("/:id")
  @UseGuards(AuthGuard())
  show(@Param("id", ParseIntPipe) id: number) {
    return this.service.show(id)
  }

  @Patch("/:id")
  @UseGuards(AuthGuard())
  update(@Param("id", ParseIntPipe) id, @Body() data: BannerEntity) {
    data.id = id
    return this.service.update(data)
  }

  @Delete("/:id")
  @UseGuards(AuthGuard())
  remove(@Param("id", ParseIntPipe) id) {
    return this.service.remove(id)
  }
}
