import {
  Injectable,
  Inject,
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException
} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { BannerEntity } from "./banner.entity"
import { Repository } from "typeorm"
import { IPageReq, Pager } from "../lib/page"
import { MediaService } from "../media/media.service"
import { LanguageType } from "./variable.entity"

@Injectable()
export class BannerService {
  @Inject()
  mediaService: MediaService

  constructor(
    @InjectRepository(BannerEntity)
    private readonly repo: Repository<BannerEntity>
  ) {}

  async all(lang?: LanguageType) {
    const items = await this.repo.find({
      relations: ["resource"],
      order: {
        weight: "DESC"
      }
    })

    if (items != null) {
      items.forEach(item => {
        if (lang === LanguageType.English) {
          item.title = item.titleEn
          item.subTitleEn = item.subTitleEn
        }
        return item.resource.withUrl(this.mediaService)
      })
    }

    return items
  }

  async create(data: BannerEntity) {
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
    item.resource.withUrl(this.mediaService)

    return item
  }

  async update(data: BannerEntity) {
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
