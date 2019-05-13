import { LanguageType } from "../main/variable.entity"

export const ETWEB_LANGUAGE = "x-etweb-lang"

export function LanguageMiddleware(req: Request, res: Response, next) {
  const lang = req["cookies"][ETWEB_LANGUAGE] || LanguageType.Chinese
  req.headers[ETWEB_LANGUAGE] = lang
  res["cookie"](ETWEB_LANGUAGE, lang)
  next()
}
