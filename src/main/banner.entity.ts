/**
 * 主页轮播图
 */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { ResourceEntity } from "src/media/resource.entity"

@Entity("banner")
export class BannerEntity {
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

  @Column()
  href: string

  @ManyToOne(type => ResourceEntity)
  resource: ResourceEntity
}
