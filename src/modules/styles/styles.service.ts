import { HttpException, Injectable } from '@nestjs/common'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'

@Injectable()
export class StylesService {
  async getStylesList() {
    const files = await (await fs.readdir(path.resolve(__dirname, '../../data/styles'))).filter(file => path.extname(file) === '.json')
    return files.map(file => path.parse(file).name)
  }

  async getStyle(name: string) {
    const filePath = path.resolve(__dirname, `../../data/styles/${name}.json`)
    try {
      await fs.stat(filePath)
    } catch {
      throw new HttpException('', 404)
    }
    return await fs.readFile(filePath, 'utf-8')
  }
}
