/**
 * 系统变量
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  ManyToOne
} from "typeorm"
import { ResourceEntity } from "../media/resource.entity"

export enum VariableKeys {
  Name = "name", // 公司、组织名称
  SubName = "sub_name", // 公司、组织子名称
  Description = "description", // 简介
  Address = "address", // 地址
  Contact = "contact", // 联系人
  Mobile = "mobile", // 手机
  Tel = "tel", // 座机
  Email = "email", // 邮箱

  Favicon = "favicon", // 网站图标
  Logo = "logo", // 网站 Logo 地址
  Latitude = "latitude", // 厂址纬度
  Longitude = "longitude", // 厂址经度

  // 首页参数
  Index2Photo = "index_2_photo", // 首页第二行图片地址
  Index2Title = "index_2_title", // 首页第二行标题
  Index2SubTitle = "index_2_sub_title", // 首页第二行副标题
  Index2Text = "index_2_text", // 首页第二行正文

  AboutUs = "about_us" // 关于我们
}

export enum LanguageType {
  Chinese = "cn",
  English = "en"
}

@Entity("variable")
export class VariableEntity {
  @PrimaryColumn()
  key: string

  @PrimaryColumn("enum", {
    enum: LanguageType,
    default: LanguageType.Chinese
  })
  language: LanguageType

  @Column("text")
  value: string

  @ManyToOne(type => ResourceEntity)
  resource: ResourceEntity
}
