import { Controller, Get, Header, Inject, Param } from '@nestjs/common'
import { StylesService } from './styles.service'

@Controller('styles')
export class StyleController {
  @Inject(StylesService)
  private readonly stylesService: StylesService

  @Get()
  async getStylesList() {
    return await this.stylesService.getStylesList()
  }

  @Get(':name')
  @Header('Content-Type', 'application/json')
  async getStyle(@Param('name') name: string) {
    return await this.stylesService.getStyle(name)
  }
}
