import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { UploadService } from './upload.service';

@Module({
  controllers: [ImagesController],
  providers: [UploadService],
})
export class ImagesModule {}
