import { ServerApplication } from './application/serverApplication';
import 'module-alias/register';

async function bootstrap(): Promise<void> {
  const serverApplication: ServerApplication = ServerApplication.new();
  await serverApplication.run();
}
bootstrap();
