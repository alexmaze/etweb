export const ETWEB_DEVICE = "x-etweb-device"

export enum DeviceType {
  Mobile = "mobile",
  Desktop = "desktop"
}

export function DeviceMiddleware(req: Request, res: Response, next) {
  const deviceAgent = req.headers["user-agent"].toLowerCase()
  const agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/)

  req.headers[ETWEB_DEVICE] = !!agentID ? DeviceType.Mobile : DeviceType.Desktop
  next()
}
