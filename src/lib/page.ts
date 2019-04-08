import { Repository } from "typeorm"

export interface IPageReq {
  page: number
  size: number
  query?: string
}

export interface IPageRes<T> extends IPageReq {
  total: number
  data: T[]
}

export class Pager<T> {
  constructor(private params: IPageReq, private repo: Repository<T>) {}

  async getPage(where?: any): Promise<IPageRes<T>> {
    const skip = (this.params.page - 1) * this.params.size

    const [data, total] = await this.repo
      .createQueryBuilder("r")
      .where(where)
      .skip(skip)
      .limit(this.params.size)
      .getManyAndCount()

    return {
      ...this.params,
      total,
      data
    }
  }
}
