export class AuthDiToken {
  // UseCase
  public static readonly RegisterUseCase: unique symbol =
    Symbol('RegisterUseCase');
  public static readonly LoginUseCase: unique symbol = Symbol('LoginUseCase');

  // Service
  public static readonly AuthService: unique symbol = Symbol('AuthService');

  // Repository

  // Strategy
  public static readonly LocalStrategy: unique symbol = Symbol('LocalStrategy');
  public static readonly JwtStrategy: unique symbol = Symbol('JwtStrategy');
}
