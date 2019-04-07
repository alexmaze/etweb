import { Controller, Get, Body, Inject, Param, Patch } from "@nestjs/common"
import { VariableService } from "src/main/variable.service"
import { VariableEntity } from "src/main/variable.entity"

@Controller("/api/admin/variable")
export class VariableController {
  @Inject()
  service: VariableService

  @Get("/")
  list() {
    return this.service.all()
  }

  @Patch("/:key")
  update(@Param("key") key, @Body() data: VariableEntity) {
    data.key = key
    return this.service.update(data)
  }
}
