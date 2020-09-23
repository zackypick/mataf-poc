/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { subComponentConfigs, SubComponent } from '@mataf-poc/shared';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

const subComponent = SubComponent.MS_ACCOUNTS;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);

  const { port: servicePort, name: serviceName } = subComponentConfigs[
    subComponent
  ];

  const options = new DocumentBuilder()
    .setTitle(serviceName)
    .setDescription(`${serviceName} API description`)
    .setVersion('1.0')
    .addTag(globalPrefix)
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(globalPrefix, app, document);

  const port = process.env.PORT || servicePort;

  await app.listen(port, () => {
    Logger.log(
      `${subComponentConfigs[subComponent].name} listening at http://localhost:${port}/${globalPrefix}`
    );
  });
}

bootstrap();
