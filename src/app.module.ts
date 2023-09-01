import { Module } from '@nestjs/common'
import { StylesModule } from './modules/styles/styles.module'
import { TilesetsModule } from './modules/tilesets/tilesets.module'
import { FontsModule } from './modules/fonts/fonts.module'

@Module({
  imports: [
    StylesModule,
    TilesetsModule,
    FontsModule,
  ],
})
export class AppModule {}
