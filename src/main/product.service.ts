import { Injectable, Inject, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { MediaService } from "../media/media.service"
import { IPageReq, Pager } from "../lib/page"
import { ProductEntity } from "./product.entity"

@Injectable()
export class ProductService {
  @Inject()
  mediaService: MediaService

  constructor(
    @InjectRepository(ProductEntity)
    private readonly repo: Repository<ProductEntity>
  ) {}

  async list(params: IPageReq) {
    const res = await new Pager(params, this.repo).getPage()

    if (res && res.data) {
      for (const item of res.data) {
        if (item.cover != null) {
          item.cover.withUrl(this.mediaService)
        }
      }
    }

    return res
  }

  async create(data: ProductEntity) {
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

  async update(data: ProductEntity) {
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
