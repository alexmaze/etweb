import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  UseInterceptors,
  FileInterceptor,
  UploadedFile,
  Query,
  Param,
  Delete,
  Patch,
  Logger,
  ParseIntPipe
} from "@nestjs/common"
import { ResourceService } from "src/media/resource.service"
import { IPageReq } from "src/lib/page"
import { ResourceEntity } from "src/media/resource.entity"

@Controller("/api/admin/resource")
export class ResourceController {
  @Inject()
  resourceService: ResourceService

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async upload(@UploadedFile() file) {
    try {
      const data = await this.resourceService.upload(file)
      return data
    } catch (err) {
      Logger.log(err)
      throw err
    }
  }

  @Get("/")
  list(@Query() query: IPageReq) {
    return this.resourceService.list(query)
  }

  @Get("/:id")
  show(@Param("id", ParseIntPipe) id) {
    return this.resourceService.show(id)
  }

  @Patch("/:id")
  update(
    @Param("id", ParseIntPipe) id,
    @Body() { description }: ResourceEntity
  ) {
    return this.resourceService.update(id, description)
  }

  @Delete("/:id")
  remove(@Param("id", ParseIntPipe) id) {
    return this.resourceService.remove(id)
  }
}
