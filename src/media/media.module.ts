import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ResourceEntity } from "./resource.entity"

@Module({
  imports: [TypeOrmModule.forFeature([ResourceEntity])]
})
export class MediaModule {}
