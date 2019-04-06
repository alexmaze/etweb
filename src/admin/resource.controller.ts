import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  UseGuards,
  Req,
  UseInterceptors,
  FileInterceptor,
  UploadedFile,
  Response,
  Res,
  Query,
  Param,
  Delete,
  Patch,
  Logger
} from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthGuard } from "@nestjs/passport"
import { IRequest } from "./interfaces"
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
  show(@Param("id") id) {
    return this.resourceService.getById(parseInt(id, 10))
  }

  @Patch("/:id")
  update(@Param("id") id, @Body() { description }: ResourceEntity) {
    return this.resourceService.update(parseInt(id, 10), description)
  }

  @Delete("/:id")
  remove(@Param("id") id) {
    return this.resourceService.removeById(parseInt(id, 10))
  }
}
