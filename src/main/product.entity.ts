/**
 * 产品
 */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { ResourceEntity } from "../media/resource.entity"

@Entity("product")
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number

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

  @Column("text")
  content: string

  @Column("text")
  contentEn: string

  @ManyToOne(type => ResourceEntity)
  cover: ResourceEntity
}
