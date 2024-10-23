import { RegisterBodyParams } from '@application/api/http-rest/controller/authentication/type/authBody';
import { Roles } from '@core/domain/authentication/Decorator/RoleDecorator';
import { AuthDiToken } from '@core/domain/authentication/di/AuthDiToken';
import { JwtAuthGuard } from '@core/domain/authentication/guard/JwtAuthGuard';
import { LocalAuthGuard } from '@core/domain/authentication/guard/LocalAuthGuard';
import { RolesGuard } from '@core/domain/authentication/guard/RoleGuard';
import { AuthService } from '@core/domain/authentication/service/AuthService';
import {
  IRegisterUseCase,
  RegisterUseCasePayload,
} from '@core/domain/authentication/useCase/RegisterUseCase';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';

@Controller('/auth')
export class AuthController {
  constructor(
    @Inject(AuthDiToken.RegisterUseCase)
    private readonly registerUseCase: IRegisterUseCase,
    @Inject(AuthDiToken.AuthService)
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  create(@Body() registerParams: RegisterBodyParams) {
    const { email, username, password } = registerParams;
    const payload: RegisterUseCasePayload = {
      data: {
        email,
        username,
        password,
      },
    };
    return this.registerUseCase.execute(payload);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Res({ passthrough: true }) res) {
    const { accessToken } = await this.authService.createAccessToken(req.user);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
    });
    return { message: 'Login successful' };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('/admin')
  async getAdmin() {
    return { message: 'Admin!' };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('MEMBER', 'ADMIN')
  @Get('/member')
  async getMember() {
    return { message: 'Member!' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/guest')
  async getGuest() {
    return { message: 'Guest!' };
  }

  @Get('/public')
  async getPublic() {
    return { message: 'Public!' };
  }
}
