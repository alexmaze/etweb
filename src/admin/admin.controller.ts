import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  UseGuards,
  Req
} from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthGuard } from "@nestjs/passport"
import { IRequest } from "./interfaces"

@Controller("/api/admin/")
export class AdminController {
  @Inject()
  private authService: AuthService

  @Get("session")
  @UseGuards(AuthGuard())
  session(@Req() request: IRequest) {
    return request.user
  }

  @Post("session")
  login(@Body() loginReq: ILoginRequest) {
    return this.authService.login(loginReq.email, loginReq.password)
  }
}

interface ILoginRequest {
  email: string
  password: string
}
