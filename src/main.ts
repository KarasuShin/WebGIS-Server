import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { NotFountFilter } from './not-found.filter'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useGlobalFilters(new NotFountFilter())
  app.useStaticAssets('public')
  await app.listen(3000)
}
bootstrap()
