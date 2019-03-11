/**
 * 多媒体资源
 * 资源上传到对象存储，本地数据库保存地址
 */
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity("resource")
export class ResourceEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    default: ""
  })
  description: string

  @Column()
  url: string
}
