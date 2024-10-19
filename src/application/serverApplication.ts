import { NestFactory } from '@nestjs/core';
import { RootModule } from './di/_rootModule';
import { ValidationPipe } from '@nestjs/common';
import { ApiServerConfig } from 'src/infrastructure/config/ApiServerConfig';
import * as cookieParser from 'cookie-parser';

export class ServerApplication {
  private readonly port: number = ApiServerConfig.PORT || 3000;

  public async run(): Promise<void> {
    const app = await NestFactory.create(RootModule);

    const allowedOrigins = ApiServerConfig.CORS_ORIGINS?.split(',') || [];

    app.enableCors({
      origin: allowedOrigins,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );

    app.use(cookieParser());

    await app.listen(this.port);
  }

  public static new(): ServerApplication {
    return new ServerApplication();
  }
}
