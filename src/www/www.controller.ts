import { Controller, Get, Render } from "@nestjs/common"

@Controller("/")
export class WwwController {
  @Get()
  @Render("index")
  root() {
    return {
      message: "hello world!"
    }
  }
}
