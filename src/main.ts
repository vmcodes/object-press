import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ClusterService } from './cluster.service';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: false,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      forbidNonWhitelisted: false,
      whitelist: true,
    })
  );

  app.use(helmet.hidePoweredBy());

  await app.listen(4000);
  console.log(`NEST (${process.pid}) IS RUNNING ON `, 4000);
}

ClusterService.clusterize(bootstrap);
