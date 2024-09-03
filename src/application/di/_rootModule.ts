import { InfrastructureModule } from '@application/di/InfrastructureModule';
import { JishoModule } from '@application/di/JishoModule';
import { Module } from '@nestjs/common';

@Module({
  imports: [InfrastructureModule, JishoModule],
  controllers: [],
  providers: [],
})
export class RootModule {}
