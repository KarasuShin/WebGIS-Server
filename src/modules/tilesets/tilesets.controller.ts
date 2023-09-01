import { Controller, Get, Inject, Param, ParseIntPipe, Req, Res } from '@nestjs/common'
import { TilesetsService } from './tilesets.service'
import type { Response } from 'express'
import type { Request } from 'express'

@Controller('tilesets')
export class TilesetsController {
  @Inject(TilesetsService)
  private readonly tilesetsService: TilesetsService

  @Get()
  async getList() {
    return await this.tilesetsService.getList()
  }

  @Get(':name/tilejson')
  async getJSON(@Param('name') name: string, @Req() req: Request) {
    const info = await this.tilesetsService.getJSON(name)
    const apiBaseUrl = `${req.protocol}://${req.headers.host}/api`
    info.tiles = info.tiles || [`${apiBaseUrl}/tilesets/${name}/{z}/{x}/{y}.${info.format}`]
    info.type = ['pbf', 'mvt'].includes(info.format) ? 'vector' : 'raster'
    return info
  }

  @Get(':name/:z(\\d+)/:x(\\d+)/:y(\\d+).(\\w+)')
  async getTile(@Res() res: Response, @Param('z', ParseIntPipe) z: number, @Param('x', ParseIntPipe) x: number, @Param('y', ParseIntPipe) y: number, @Param('name') name: string) {
    const { grid, headers } = await this.tilesetsService.getTile(name, x, y, z)
    delete headers.ETag
    res.set(headers).send(grid)
  }
}
