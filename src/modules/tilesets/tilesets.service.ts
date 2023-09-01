import { HttpException, Injectable } from '@nestjs/common'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { MBTiles } from '@karasushin/mbtiles'

@Injectable()
export class TilesetsService {
  async getList() {
    const files = await (await fs.readdir(path.resolve(__dirname, '../../data/tilesets'))).filter(file => path.extname(file) === '.mbtiles')
    return files.map(file => path.parse(file).name)
  }

  async getJSON(name: string) {
    const filePath = await this.checkTileset(name)
    const mbtiles = new MBTiles(`mbtiles://${filePath}?mode=ro`)
    try {
      await mbtiles.connect()
      const info: any = await mbtiles.getInfo()
      return info
    } finally {
      mbtiles.close()
    }
  }

  async getTile(name: string, x: number, y: number, z: number) {
    const filePath = await this.checkTileset(name)
    const mbtiles = new MBTiles(`mbtiles://${filePath}?mode=ro`)
    try {
      await mbtiles.connect()
      const tile = await mbtiles.getTile(x, y, z)
      return tile
    } catch (error) {
      if (error?.message === 'Tile does not exist') {
        throw new HttpException('', 404)
      }
    } finally {
      mbtiles.close()
    }
  }

  private async checkTileset(name: string) {
    const filePath = path.resolve(__dirname, `../../data/tilesets/${name}.mbtiles`)
    try {
      await fs.stat(filePath)
      return filePath
    } catch {
      throw new HttpException('', 404)
    }
  }
}
