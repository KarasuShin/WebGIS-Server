import { Module } from '@nestjs/common'
import { FontsController } from './fonts.controller'
import { FontsService } from './fonts.service'

@Module({
  imports: [],
  controllers: [FontsController],
  providers: [FontsService],
})
export class FontsModule {}
