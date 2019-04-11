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
import { ArticleService } from "../main/article.service"
import { ArticleEntity, ArticleType } from "../main/article.entity"
import { IPageReq } from "../lib/page"

@Controller("/api/admin/article")
export class ArticleController {
  @Inject()
  service: ArticleService

  @Get("/")
  // TODO @UseGuards(AuthGuard())
  list(
    @Query()
    query: IPageReq & {
      type?: ArticleType
    }
  ) {
    return this.service.list(query, query.type)
  }

  @Post("/")
  create(@Body() data: ArticleEntity) {
    return this.service.create(data)
  }

  @Get("/:id")
  show(@Param("id", ParseIntPipe) id: number) {
    return this.service.show(id)
  }

  @Patch("/:id")
  update(@Param("id", ParseIntPipe) id, @Body() data: ArticleEntity) {
    data.id = id
    return this.service.update(data)
  }

  @Delete("/:id")
  remove(@Param("id", ParseIntPipe) id) {
    return this.service.remove(id)
  }
}
