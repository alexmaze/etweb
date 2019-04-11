import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { VariableEntity } from "./variable.entity"
import { ArticleEntity } from "./article.entity"
import { BannerEntity } from "./banner.entity"
import { HonorEntity } from "./honor.entity"
import { LookEntity } from "./look.entity"
import { PositionEntity } from "./position.entity"
import { ProductEntity } from "./product.entity"
import { BannerService } from "./banner.service"
import { VariableService } from "./variable.service"
import { MediaModule } from "../media/media.module"
import { ArticleService } from "./article.service"
import { HonorService } from "./honor.service"
import { LookService } from "./look.service"
import { ProductService } from "./product.service"
import { PositionService } from "./position.service"

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArticleEntity,
      BannerEntity,
      HonorEntity,
      LookEntity,
      PositionEntity,
      ProductEntity,
      VariableEntity
    ]),
    MediaModule
  ],
  providers: [
    BannerService,
    VariableService,
    ArticleService,
    HonorService,
    LookService,
    ProductService,
    PositionService
  ],
  exports: [
    BannerService,
    VariableService,
    ArticleService,
    HonorService,
    LookService,
    ProductService,
    PositionService
  ]
})
export class MainModule {}
