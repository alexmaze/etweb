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
import { LookService } from "../main/look.service"
import { LookEntity } from "../main/look.entity"
import { IPageReq } from "../lib/page"
import { AuthGuard } from "@nestjs/passport"

@Controller("/api/admin/look")
export class LookController {
  @Inject()
  service: LookService

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
  create(@Body() data: LookEntity) {
    return this.service.create(data)
  }

  @Get("/:id")
  @UseGuards(AuthGuard())
  show(@Param("id", ParseIntPipe) id: number) {
    return this.service.show(id)
  }

  @Patch("/:id")
  @UseGuards(AuthGuard())
  update(@Param("id", ParseIntPipe) id, @Body() data: LookEntity) {
    data.id = id
    return this.service.update(data)
  }

  @Delete("/:id")
  @UseGuards(AuthGuard())
  remove(@Param("id", ParseIntPipe) id) {
    return this.service.remove(id)
  }
}
