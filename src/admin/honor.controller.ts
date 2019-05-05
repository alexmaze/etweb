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
  Query,
  UseGuards
} from "@nestjs/common"
import { HonorService } from "../main/honor.service"
import { HonorEntity } from "../main/honor.entity"
import { IPageReq } from "../lib/page"
import { AuthGuard } from "@nestjs/passport"

@Controller("/api/admin/honor")
export class HonorController {
  @Inject()
  service: HonorService

  @Get("/")
  @UseGuards(AuthGuard())
  list(
    @Query()
    query: IPageReq
  ) {
    return this.service.list(query)
  }

  @Post("/")
  @UseGuards(AuthGuard())
  create(@Body() data: HonorEntity) {
    return this.service.create(data)
  }

  @Get("/:id")
  @UseGuards(AuthGuard())
  show(@Param("id", ParseIntPipe) id: number) {
    return this.service.show(id)
  }

  @Patch("/:id")
  @UseGuards(AuthGuard())
  update(@Param("id", ParseIntPipe) id, @Body() data: HonorEntity) {
    data.id = id
    return this.service.update(data)
  }

  @Delete("/:id")
  @UseGuards(AuthGuard())
  remove(@Param("id", ParseIntPipe) id) {
    return this.service.remove(id)
  }
}
