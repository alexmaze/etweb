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
  Patch
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
      console.log(err)
      throw err
    }
  }

  @Get("/")
  list(@Query() query: IPageReq) {
    return this.resourceService.list(query)
  }

  @Get("/:key")
  show(@Param("key") key) {
    return this.resourceService.getByKey(key)
  }

  @Patch("/:key")
  update(@Param("key") key, @Body() { description }: ResourceEntity) {
    return this.resourceService.update(key, description)
  }

  @Delete("/:key")
  remove(@Param("key") key) {
    return this.resourceService.removeByKey(key)
  }
}
