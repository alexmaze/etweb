import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

export enum AccountType {
  Admin = "admin",
  Visitor = "visitor"
}

@Entity("account")
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({
    unique: true,
    nullable: false
  })
  email: string

  @Column()
  password: string

  @Column("text")
  description: string

  @Column("enum", {
    enum: AccountType
  })
  type: AccountType

  @Column({ default: true })
  isActive: boolean
}
