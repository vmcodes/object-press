import { Controller, Req, Res, Put, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { UploadService } from './upload.service';
import { JwtUploadGuard } from '../auth/guards';

@Controller('uploads')
export class ImagesController {
  constructor(private uploadService: UploadService) {}

  @Put()
  @UseGuards(JwtUploadGuard)
  async imageUpload(@Req() req: Request, @Res() res: Response) {
    await this.uploadService.upload(req, res, function (err) {
      if (err) {
        return res.status(500).send();
      }
      return res.status(201).send();
    });
  }
}
