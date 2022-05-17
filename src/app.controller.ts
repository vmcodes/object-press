import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('graphql')
  health() {
    return 'OK';
  }
}
