import { get } from 'env-var';

export class ApiServerConfig {
  public static readonly PORT: number = get('PORT').required().asPortNumber();
  public static readonly CORS_ORIGINS: string = get('CORS_ORIGINS')
    .required()
    .asString();
  public static readonly JWT_SECRET: string = get('JWT_SECRET')
    .required()
    .asString();
}
