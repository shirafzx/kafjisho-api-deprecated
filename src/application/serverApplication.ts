import { NestFactory } from '@nestjs/core';
import { RootModule } from './di/_rootModule';
import { ValidationPipe } from '@nestjs/common';

export class ServerApplication {
  private readonly port: number = 4000;

  public async run(): Promise<void> {
    const app = await NestFactory.create(RootModule);

    app.enableCors({
      origin: process.env.APP_DOMAIN,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    await app.listen(this.port);
  }

  public static new(): ServerApplication {
    return new ServerApplication();
  }
}
