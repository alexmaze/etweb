import { Injectable, Global } from "@nestjs/common"
import { ConfigService } from "../config/config.service"
import * as qiniu from "qiniu"
import { IOssOptions } from "../config/config.interface"
import { Duplex } from "stream"
import uuid = require("uuid")

@Global()
@Injectable()
export class MediaService {
  private ossConfig: IOssOptions
  private bucketManager: qiniu.rs.BucketManager
  private formUploader: qiniu.form_up.FormUploader

  constructor(private configService: ConfigService) {
    this.ossConfig = this.configService.config.oss

    const mac = new qiniu.auth.digest.Mac(
      this.ossConfig.accessKey,
      this.ossConfig.secretKey
    )
    const config = new qiniu.conf.Config()

    this.bucketManager = new qiniu.rs.BucketManager(mac, config)
    this.formUploader = new qiniu.form_up.FormUploader(config)
  }

  // 上传文件到对象存储，成功返回key
  async uploadFile(file: any) {
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: this.ossConfig.bucket
    })
    const mac = new qiniu.auth.digest.Mac(
      this.ossConfig.accessKey,
      this.ossConfig.secretKey
    )
    const uploadToken = putPolicy.uploadToken(mac)

    const stream = new Duplex()
    stream.push(file.buffer)
    stream.push(null)

    const fileKey = randomKey()

    return new Promise((res, rej) => {
      this.formUploader.putStream(
        uploadToken,
        fileKey,
        stream,
        new qiniu.form_up.PutExtra(),
        (err, body, info) => {
          if (err != null) {
            return rej(err)
          }

          return res(fileKey)
        }
      )
    })
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

  // 获取文件URL
  getPublicUrl(key: string, expireTime?: Date) {
    // 默认URL一小时过期
    if (expireTime == null) {
      expireTime = new Date()
      expireTime.setHours(expireTime.getHours() + 1)
    }

    return this.bucketManager.privateDownloadUrl(
      this.ossConfig.domain,
      key,
      parseInt(expireTime.getTime() / 1000 + "", 10)
    )
  }

  // 从对象存储删除文件
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

function randomKey() {
  return uuid.v4()
}
