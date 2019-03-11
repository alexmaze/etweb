/**
 * 文章：新闻咨询、经验分享
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  PrimaryColumn
} from "typeorm"
import { ResourceEntity } from "src/media/resource.entity"

export enum ArticleType {
  News = "news",
  Share = "share"
}

@Entity("article")
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number

  @PrimaryColumn("enum", {
    enum: ArticleType,
    default: ArticleType.News
  })
  type: ArticleType

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

  // 热门
  @Column()
  isHot: boolean

  // 置顶
  @Column()
  isTop: boolean

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date

  @Column()
  viewCount: number

  @ManyToOne(type => ResourceEntity)
  cover: ResourceEntity
}