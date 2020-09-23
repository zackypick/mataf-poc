import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { subComponentConfigs, SubComponent } from '@mataf-poc/shared';

import { AppModule } from './app/app.module';
import { InMemoryMongoService } from './in-memory-mongo/in-memory-mongo.service';

const subComponent = SubComponent.ODS_DB;

export const globalPrefix = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(globalPrefix);

  const { port: servicePort, name: serviceName } = subComponentConfigs[
    subComponent
  ];

  await app.listen(process.env.PORT || servicePort, () => {
    Logger.log(
      `${subComponentConfigs[subComponent].name} listening at http://localhost:${servicePort}/${globalPrefix}`
    );
  });

  const mongoInstance = app.get(InMemoryMongoService);

  mongoInstance.spinServer();
}

bootstrap();
