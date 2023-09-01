import { type ArgumentsHost, Catch, type ExceptionFilter, HttpException } from '@nestjs/common'
import type { Response } from 'express'

@Catch(HttpException)
export class NotFountFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const status = exception.getStatus()
    const res = ctx.getResponse<Response>()
    if (status === 404) {
      res.status(404).json()
    }
    res.status(404).json()
  }
}
