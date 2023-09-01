import { HttpException, Injectable } from '@nestjs/common'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import * as glyphPbfComposite from '@mapbox/glyph-pbf-composite'

@Injectable()
export class FontsService {
  async getList() {
    const files = await (await fs.readdir(path.resolve(__dirname, '../../data/fonts')))
    return files.map(file => path.parse(file).name)
  }

  async getGlyphs(fontNames: string[], start: number, end: number) {
    const fontsDir = path.resolve(__dirname, '../../data/fonts')
    const glyphPaths = fontNames.map(fontName => `${fontsDir}/${fontName}/${start}-${end}.pbf`)

    const promises = glyphPaths.map(async glyphPath => {
      try {
        return await fs.readFile(glyphPath)
      } catch {
      }
    })

    const buffers = await Promise.all(promises)
    const glyphs = buffers.filter(buffer => buffer && buffer.length > 0)
    if (glyphs.length === 0) {
      throw new HttpException('', 404)
    }
    // res.set('Content-Type', 'application/x-protobuf')
    return glyphPbfComposite.combine(glyphs)
  }
}
