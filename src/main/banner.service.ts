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
import { IPageReq, Pager } from "src/lib/page"

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(BannerEntity)
    private readonly bannerRepo: Repository<BannerEntity>
  ) {}

  async all() {
    const items = await this.bannerRepo.find()
    return items
  }

  async create(data: BannerEntity) {
    return this.bannerRepo.save(data)
  }

  async show(id: number) {
    const item = await this.bannerRepo.findOne({
      id
    })

    if (item == null) {
      throw new NotFoundException()
    }

    return item
  }

  async update(data: BannerEntity) {
    const item = await this.show(data.id)

    return this.bannerRepo.save(data)
  }

  async remove(id: number) {
    try {
      const item = await this.show(id)
      await this.bannerRepo.remove(item)
    } catch (err) {
      throw err
    }

    return {}
  }
}
