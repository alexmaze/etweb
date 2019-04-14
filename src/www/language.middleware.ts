import { LanguageType } from "src/main/variable.entity"

export const ETWEB_LANGUAGE = "x-req-lang"

export function LanguageMiddleware(req: Request, res: Response, next) {
  const lang = req.headers[ETWEB_LANGUAGE] || LanguageType.Chinese
  req.headers[ETWEB_LANGUAGE] = lang

  next()
}
