import {
  Controller,
  Get,
  Body,
  Inject,
  Param,
  Patch,
  UseGuards
} from "@nestjs/common"
import { VariableService } from "../main/variable.service"
import { VariableEntity } from "../main/variable.entity"
import { AuthGuard } from "@nestjs/passport"

@Controller("/api/admin/variable")
export class VariableController {
  @Inject()
  service: VariableService

  @Get("/")
  @UseGuards(AuthGuard())
  list() {
    return this.service.all()
  }

  @Patch("/:key")
  @UseGuards(AuthGuard())
  update(@Param("key") key, @Body() data: VariableEntity) {
    data.key = key
    return this.service.update(data)
  }
}
