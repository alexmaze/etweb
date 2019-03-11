import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ResourceEntity } from "./resource.entity"
import { MediaService } from "./media.service"

@Module({
  imports: [TypeOrmModule.forFeature([ResourceEntity])],
  providers: [MediaService],
  exports: [MediaService]
})
export class MediaModule {}
