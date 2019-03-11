import { Injectable, Global } from "@nestjs/common"
import { ConfigService } from "src/config/config.service"
import * as qiniu from "qiniu"
import { IOssOptions } from "src/config/config.interface"

@Global()
@Injectable()
export class MediaService {
  private ossConfig: IOssOptions
  private bucketManager: qiniu.rs.BucketManager

  constructor(private configService: ConfigService) {
    this.ossConfig = this.configService.config.oss

    const mac = new qiniu.auth.digest.Mac(
      this.ossConfig.accessKey,
      this.ossConfig.secretKey
    )
    const config = new qiniu.conf.Config()

    this.bucketManager = new qiniu.rs.BucketManager(mac, config)
  }

  statFile(key: string) {
    return new Promise((res, rej) => {
      this.bucketManager.stat(
        this.ossConfig.bucket,
        key,
        (err: Error, body: any) => {
          if (err != null) {
            return rej(err)
          }

          return res(body)
        }
      )
    })
  }

  getPublicUrl(key: string, expireTime?: Date) {
    // 默认URL一小时过期
    if (expireTime == null) {
      expireTime = new Date()
      expireTime.setHours(expireTime.getHours() + 1)
      console.log(expireTime.toLocaleString())
    }

    return this.bucketManager.privateDownloadUrl(
      this.ossConfig.domain,
      key,
      expireTime.getTime() / 1000
    )
  }

  deleteFile(key: string) {
    return new Promise((res, rej) => {
      this.bucketManager.delete(
        this.ossConfig.bucket,
        key,
        (err: Error, body: any) => {
          if (err != null) {
            return rej(err)
          }

          return res(body)
        }
      )
    })
  }
}
