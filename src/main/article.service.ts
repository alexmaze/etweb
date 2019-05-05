import { Injectable, Inject, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { MediaService } from "../media/media.service"
import { ArticleEntity, ArticleType } from "./article.entity"
import { IPageReq, Pager } from "../lib/page"
import { LanguageType } from "./variable.entity"

@Injectable()
export class ArticleService {
  @Inject()
  mediaService: MediaService

  constructor(
    @InjectRepository(ArticleEntity)
    private readonly repo: Repository<ArticleEntity>
  ) {}

  async list(params: IPageReq, type?: ArticleType, lang?: LanguageType) {
    const res = await new Pager(params, this.repo).getPage(
      !!type
        ? {
            type
          }
        : null,
      "createdAt",
      "DESC"
    )

    if (res && res.data) {
      for (const item of res.data) {
        const { cover } = await this.show(item.id)
        item.cover = cover

        if (item.cover != null) {
          item.cover.withUrl(this.mediaService)
        }

        if (lang === LanguageType.English) {
          item.title = item.titleEn
          item.subTitle = item.subTitleEn
          item.content = item.contentEn
        }
      }
    }

    return res
  }

  async create(data: ArticleEntity) {
    data.createdAt = new Date()
    data.updatedAt = data.createdAt
    data.viewCount = 0
    return this.repo.save(data)
  }

  async show(id: number) {
    const item = await this.repo.findOne(
      {
        id
      },
      {
        relations: ["cover"]
      }
    )

    if (item == null) {
      throw new NotFoundException()
    }
    if (item.cover != null) {
      item.cover.withUrl(this.mediaService)
    }

    return item
  }

  async update(data: ArticleEntity) {
    const item = await this.show(data.id)

    return this.repo.save(data)
  }

  async remove(id: number) {
    try {
      const item = await this.show(id)
      await this.repo.remove(item)
    } catch (err) {
      throw err
    }

    return {}
  }
}
