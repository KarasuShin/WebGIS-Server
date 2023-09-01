import { Module } from '@nestjs/common'
import { StyleController } from './styles.controller'
import { StylesService } from './styles.service'

@Module({
  imports: [],
  controllers: [StyleController],
  providers: [StylesService],
})
export class StylesModule {}
