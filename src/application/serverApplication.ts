import { NestFactory } from '@nestjs/core';
import { RootModule } from './di/_rootModule';

export class ServerApplication {
  private readonly port: number = 4000;

  public async run(): Promise<void> {
    const app = await NestFactory.create(RootModule);
    await app.listen(this.port);
  }

  public static new(): ServerApplication {
    return new ServerApplication();
  }
}
