import { Injectable, Inject, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { MediaService } from "../media/media.service"
import { ArticleEntity, ArticleType } from "./article.entity"
import { IPageReq, Pager } from "../lib/page"

@Injectable()
export class ArticleService {
  @Inject()
  mediaService: MediaService

  constructor(
    @InjectRepository(ArticleEntity)
    private readonly repo: Repository<ArticleEntity>
  ) {}

  async list(params: IPageReq, type?: ArticleType) {
    const res = await new Pager(params, this.repo).getPage(
      !!type
        ? {
            type
          }
        : null
    )

    if (res && res.data) {
      for (const item of res.data) {
        if (item.cover != null) {
          item.cover.withUrl(this.mediaService)
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
