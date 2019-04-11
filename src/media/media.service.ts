import { Injectable, Global } from "@nestjs/common"
import { ConfigService } from "../config/config.service"
import { IOssOptions } from "../config/config.interface"
import uuid = require("uuid")

import * as OSS from "ali-oss" 

@Global()
@Injectable()
export class MediaService {
  private ossConfig: IOssOptions

  getClient() {
    return new OSS({
      region: this.ossConfig.region,
      accessKeyId: this.ossConfig.accessKey,
      accessKeySecret: this.ossConfig.secretKey,
      bucket: this.ossConfig.bucket,
      endpoint: this.ossConfig.domain,
      cname: true
    })
  }

  constructor(private configService: ConfigService) {
    this.ossConfig = this.configService.config.oss
  }

  // 上传文件到对象存储，成功返回key
  async uploadFile(file: any) {
    const key = randomKey()
    await this.getClient().put(key, file.buffer);
    return key
  }

  // 获取文件URL
  getPublicUrl(key: string, process?: string, expires?: number) {
    // 默认URL一小时过期
    if (expires == null) {
      expires = 3600
    }

    return this.getClient().signatureUrl(key, {
      process,
      expires
    })
  }

  // 从对象存储删除文件
  deleteFile(key: string) {
    return this.getClient().delete(key)
  }
}

function randomKey() {
  return uuid.v4()
}
