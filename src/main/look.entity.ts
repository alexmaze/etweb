/**
 * 厂房容貌
 */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { ResourceEntity } from "../media/resource.entity"

export enum LookType {
  Factory = "factory",
  CommandCenter = "command_center",
  Transport = "transport"
}

@Entity("look")
export class LookEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column("enum", {
    enum: LookType,
    default: LookType.Factory
  })
  type: LookType

  // 权重: 排序根据权重降序
  @Column()
  weight: number

  @Column()
  title: string

  @Column()
  titleEn: string

  @Column()
  subTitle: string

  @Column()
  subTitleEn: string

  @ManyToOne(type => ResourceEntity)
  resource: ResourceEntity
}
