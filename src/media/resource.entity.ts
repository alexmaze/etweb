/**
 * 多媒体资源
 * 资源上传到对象存储，本地数据库保存地址
 */
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { MediaService } from "./media.service"

@Entity("resource")
export class ResourceEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    default: ""
  })
  description: string

  @Column({
    unique: true
  })
  key: string

  @Column()
  createdAt: Date

  // 不保存在数据库
  rawUrl?: string
  thumbUrl?: string

  constructor(key: string) {
    this.key = key
    this.description = "未设置"
    this.createdAt = new Date()
  }

  withUrl(mediaService: MediaService) {
    this.rawUrl = mediaService.getPublicUrl(this.key + "?imageslim")
    this.thumbUrl = mediaService.getPublicUrl(
      this.key + "?imageView2/2/w/200/h/200/format/jpg/q/75|imageslim"
    )
  }
}
