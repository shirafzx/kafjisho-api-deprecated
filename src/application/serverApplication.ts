import { NestFactory } from '@nestjs/core';
import { RootModule } from './di/_rootModule';
import { ValidationPipe } from '@nestjs/common';

export class ServerApplication {
  private readonly port: number = Number(process.env.PORT) || 3000;

  public async run(): Promise<void> {
    const app = await NestFactory.create(RootModule);

    app.enableCors({
      origin: process.env.CORS_ORIGINS,
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
