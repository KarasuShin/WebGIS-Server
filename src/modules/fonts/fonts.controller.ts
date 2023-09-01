import { Controller, Get, Header, Inject, Param, ParseIntPipe, Res } from '@nestjs/common'
import { FontsService } from './fonts.service'
import type { Response } from 'express'

@Controller('fonts')
export class FontsController {
  @Inject(FontsService)
  private readonly fontsService: FontsService

  @Get()
  async getList() {
    return await this.fontsService.getList()
  }

  @Get(':names/:start(\\d+)-:end(\\d+).pbf')
  @Header('Content-Type', 'application/x-protobuf')
  async getGlyphs(@Param('names') names: string, @Param('start', ParseIntPipe) start: number, @Param('end', ParseIntPipe) end: number, @Res() res: Response) {
    const fontNames = names.split(',').map(i => i.trim())
    const info = await this.fontsService.getGlyphs(fontNames, start, end)
    res.send(info)
  }
}
