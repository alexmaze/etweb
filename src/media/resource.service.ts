import {
  Injectable,
  Inject,
  InternalServerErrorException,
  UnauthorizedException
} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { ResourceEntity } from "./resource.entity"
import { Repository } from "typeorm"
import { IPageReq, Pager } from "src/lib/page"
import { MediaService } from "./media.service"

@Injectable()
export class ResourceService {
  @Inject()
  mediaService: MediaService

  constructor(
    @InjectRepository(ResourceEntity)
    private readonly resourceRepo: Repository<ResourceEntity>
  ) {}

  async list(params: IPageReq) {
    const res = await new Pager(params, this.resourceRepo).getPage()

    if (res && res.data) {
      for (const item of res.data) {
        item.withUrl(this.mediaService)
      }
    }

    return res
  }

  async getByKey(key: string, ignoreUrl?: boolean) {
    const item = await this.resourceRepo.findOne({
      key
    })

    if (!ignoreUrl) {
      item.withUrl(this.mediaService)
    }
    return item
  }

  async update(key: string, description?: string) {
    const item = await this.getByKey(key, true)
    if (description != null) {
      item.description = description
    }

    return this.resourceRepo.save(item)
  }

  async removeByKey(key: string) {
    try {
      await this.mediaService.deleteFile(key)
      const item = await this.getByKey(key, true)
      await this.resourceRepo.remove(item)
    } catch (err) {
      throw err
    }
  }

  async upload(file: File) {
    let fileKey = null
    try {
      fileKey = await this.mediaService.uploadFile(file)
      const entity = new ResourceEntity(fileKey)
      return await this.resourceRepo.save(entity)
    } catch (err) {
      if (fileKey != null) {
        this.mediaService.deleteFile(fileKey)
      }
      throw err
    }
  }
}
