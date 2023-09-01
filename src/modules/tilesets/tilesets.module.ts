import { Module } from '@nestjs/common'
import { TilesetsController } from './tilesets.controller'
import { TilesetsService } from './tilesets.service'

@Module({
  imports: [],
  controllers: [TilesetsController],
  providers: [TilesetsService],
})
export class TilesetsModule {}
