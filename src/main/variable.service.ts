import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { VariableEntity, VariableKeys, LanguageType } from "./variable.entity"

@Injectable()
export class VariableService {
  constructor(
    @InjectRepository(VariableEntity)
    private readonly variableRepo: Repository<VariableEntity>
  ) {
    this._init()
  }

  async _init() {
    // 初始化
    for (const key of Object.values(VariableKeys)) {
      for (const lang of Object.values(LanguageType)) {
        let item = await this.variableRepo.findOne({
          key,
          language: lang as any
        })

        if (item == null) {
          item = this.variableRepo.create()
          item.key = key
          item.value = ""
          item.language = lang as any
          await this.variableRepo.save(item)
        }
      }
    }
  }

  async all() {
    const items = await this.variableRepo.find()
    return items
  }

  async show(key: string, lang: LanguageType) {
    const item = await this.variableRepo.findOne({
      key,
      language: lang
    })

    if (item == null) {
      throw new NotFoundException()
    }

    return item
  }

  async update(data: VariableEntity) {
    const item = await this.show(data.key, data.language)

    return this.variableRepo.save(data)
  }
}