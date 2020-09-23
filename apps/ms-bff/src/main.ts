import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { subComponentConfigs, SubComponent } from '@mataf-poc/shared';

import { AppModule } from './app/app.module';

const subComponent = SubComponent.MS_BFF;

export const globalPrefix = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(globalPrefix);

  const { port: servicePort, name: serviceName } = subComponentConfigs[
    subComponent
  ];

  const options = new DocumentBuilder()
    .setTitle(serviceName)
    .setDescription(`${serviceName} API description`)
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(globalPrefix, app, document);

  await app.listen(process.env.PORT || servicePort, () => {
    Logger.log(
      `${subComponentConfigs[subComponent].name} listening at http://localhost:${servicePort}/${globalPrefix}`
    );
  });
}

bootstrap();
