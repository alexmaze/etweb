import { AccountEntity } from "src/account/account.entity"

export interface IRequest extends Request {
  user?: AccountEntity
}
