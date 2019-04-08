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
import { PositionService } from "src/main/position.service"
import { PositionEntity } from "src/main/position.entity"
import { IPageReq } from "src/lib/page"

@Controller("/api/admin/position")
export class PositionController {
  @Inject()
  service: PositionService

  @Get("/")
  // TODO @UseGuards(AuthGuard())
  list(
    @Query()
    query: IPageReq
  ) {
    return this.service.list(query)
  }

  @Post("/")
  create(@Body() data: PositionEntity) {
    return this.service.create(data)
  }

  @Get("/:id")
  show(@Param("id", ParseIntPipe) id: number) {
    return this.service.show(id)
  }

  @Patch("/:id")
  update(@Param("id", ParseIntPipe) id, @Body() data: PositionEntity) {
    data.id = id
    return this.service.update(data)
  }

  @Delete("/:id")
  remove(@Param("id", ParseIntPipe) id) {
    return this.service.remove(id)
  }
}
