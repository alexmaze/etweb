import { Injectable, Inject, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { MediaService } from "../media/media.service"
import { IPageReq, Pager } from "../lib/page"
import { PositionEntity } from "./position.entity"
import { LanguageType } from "./variable.entity"

@Injectable()
export class PositionService {
  @Inject()
  mediaService: MediaService

  constructor(
    @InjectRepository(PositionEntity)
    private readonly repo: Repository<PositionEntity>
  ) {}

  async list(params: IPageReq, lang?: LanguageType) {
    const res = await new Pager(params, this.repo).getPage(
      null,
      "weight",
      "DESC"
    )

    if (res && res.data) {
      for (const item of res.data) {
        if (lang === LanguageType.English) {
          item.title = item.titleEn
          item.subTitle = item.subTitleEn
          item.content = item.contentEn
        }
      }
    }

    return res
  }

  async create(data: PositionEntity) {
    return this.repo.save(data)
  }

  async show(id: number) {
    const item = await this.repo.findOne({
      id
    })

    if (item == null) {
      throw new NotFoundException()
    }

    return item
  }

  async update(data: PositionEntity) {
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
