import { Injectable, Inject, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { MediaService } from "src/media/media.service"
import { ArticleEntity } from "./article.entity"
import { IPageReq, Pager } from "src/lib/page"

@Injectable()
export class ArticleService {
  @Inject()
  mediaService: MediaService

  constructor(
    @InjectRepository(ArticleEntity)
    private readonly repo: Repository<ArticleEntity>
  ) {}

  async list(params: IPageReq) {
    const res = await new Pager(params, this.repo).getPage()

    if (res && res.data) {
      for (const item of res.data) {
        item.cover.withUrl(this.mediaService)
      }
    }

    return res
  }

  async create(data: ArticleEntity) {
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
    item.cover.withUrl(this.mediaService)

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
