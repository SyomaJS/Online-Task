import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, SignInUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiCookieAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { StorageGetter } from '../decorators/storageGetter.decorator';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { Response } from 'express';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiBody({ type: CreateUserDto })
  signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.signup(createUserDto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Sign in an existing user' })
  @ApiBody({ type: SignInUserDto })
  signin(
    @Body() signInUserDto: SignInUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.signin(signInUserDto, res);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a user by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('logout')
  @ApiOperation({ summary: 'Logout a user' })
  @ApiCookieAuth()
  logout(
    @CookieGetter() refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.logout(refreshToken, res);
  }

  @Get('get-profile')
  @ApiOperation({ summary: 'Get a profile page' })
  @ApiCookieAuth()
  getProfile(@StorageGetter() accessToken: string) {
    return this.userService.getProfile(accessToken);
  }
}
