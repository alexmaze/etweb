import { Injectable, Inject, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { MediaService } from "src/media/media.service"
import { IPageReq, Pager } from "src/lib/page"
import { HonorEntity } from "./honor.entity"

@Injectable()
export class HonorService {
  @Inject()
  mediaService: MediaService

  constructor(
    @InjectRepository(HonorEntity)
    private readonly repo: Repository<HonorEntity>
  ) {}

  async list(params: IPageReq) {
    const res = await new Pager(params, this.repo).getPage()

    if (res && res.data) {
      for (const item of res.data) {
        if (item.resource != null) {
          item.resource.withUrl(this.mediaService)
        }
      }
    }

    return res
  }

  async create(data: HonorEntity) {
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

  async update(data: HonorEntity) {
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
