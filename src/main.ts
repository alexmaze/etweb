import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ConfigService } from "./config/config.service"
import { Logger } from "@nestjs/common"
import { join } from "path"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const { config, mode } = app.get(ConfigService)

  app.useStaticAssets(join(__dirname, "..", "public"))
  app.setBaseViewsDir(join(__dirname, "..", "views"))
  app.setViewEngine("hbs")

  await app.listen(config.port)

  Logger.log(`Running on :${config.port} in ${mode} mode.`)
}

bootstrap()
