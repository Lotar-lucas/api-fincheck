import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signinDto.dto';
import { SignupDto } from './dto/signupDto.dto';
import { isRoutePublic } from 'src/shared/decorators/IsRoutePublic';

@isRoutePublic
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    console.log('signinDto', signinDto);
    return this.authService.signin(signinDto);
  }

  @Post('signup')
  create(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}
