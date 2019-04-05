import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  UseGuards,
  Req
} from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { InjectRepository } from "@nestjs/typeorm"
import { ArticleEntity } from "src/main/article.entity"
import { Repository } from "typeorm"
import { AccountEntity } from "src/account/account.entity"

@Controller("/api/admin/article")
// @UseGuards(AuthGuard())
export class ArticleController {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepo: Repository<AccountEntity>
  ) {}

  @Get("/")
  async list() {
    // this.articleRepo.
    // console.log(await this.articleRepo.count())
    return "hello"
  }
}
