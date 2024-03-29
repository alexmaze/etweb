import { Injectable, Inject, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { MediaService } from "../media/media.service"
import { IPageReq, Pager } from "../lib/page"
import { LookEntity, LookType } from "./look.entity"
import { LanguageType } from "./variable.entity"

@Injectable()
export class LookService {
  @Inject()
  mediaService: MediaService

  constructor(
    @InjectRepository(LookEntity)
    private readonly repo: Repository<LookEntity>
  ) {}

  async list(params: IPageReq, type?: LookType, lang?: LanguageType) {
    const res = await new Pager(params, this.repo).getPage(
      !!type
        ? {
            type
          }
        : null,
      "weight",
      "DESC"
    )

    if (res && res.data) {
      for (const item of res.data) {
        const { resource } = await this.show(item.id)
        item.resource = resource

        if (item.resource != null) {
          item.resource.withUrl(this.mediaService)
        }

        if (lang === LanguageType.English) {
          item.title = item.titleEn
          item.subTitle = item.subTitleEn
        }
      }
    }

    return res
  }

  async create(data: LookEntity) {
    return this.repo.save(data)
  }

  async show(id: number) {
    const item = await this.repo.findOne(
      {
        id
      },
      {
        relations: ["resource"]
      }
    )

    if (item == null) {
      throw new NotFoundException()
    }
    if (item.resource != null) {
      item.resource.withUrl(this.mediaService)
    }

    return item
  }

  async update(data: LookEntity) {
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
