import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, SignInUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../redis/redis.service';
import { In } from 'typeorm';
import { IPayloadType } from '../types/IPayload.type';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const { login, password } = createUserDto;

    const existingUser = await this.findByLogin(login);

    if (existingUser) {
      throw new Error('User with this login already exists');
    }

    const newUser = this.userRepository.create({
      ...createUserDto,
      hashed_password: await bcrypt.hash(password, 7),
    });

    return this.userRepository.save(newUser);
  }

  async signin(
    signInUserDto: SignInUserDto,
    res: Response,
  ): Promise<{
    user: User;
    access_token: string;
  }> {
    // const ping = await this.redisService.ping();
    // console.log(`Ping of redis: ${ping}`);

    const { login, password } = signInUserDto;

    const user = await this.findByLogin(login);
    if (!user) {
      throw new UnauthorizedException('Login or password incorrect');
    }

    const isMatch = await bcrypt.compare(password, user.hashed_password);

    if (!isMatch) {
      throw new UnauthorizedException('Login or password incorrect');
    }

    const tokens = await this.getTokens(user);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    // const redisClient = this.redisService.getClient();

    // await redisClient.set(
    //   `access_token_${user.id}`,
    //   tokens.access_token,
    //   'EX',
    //   parseInt(process.env.ACCESS_TOKEN_TIME),
    // );
    // await redisClient.set(
    //   `refresh_token_${user.id}`,
    //   tokens.refresh_token,
    //   'EX',
    //   parseInt(process.env.REFRESH_TOKEN_TIME),
    // );

    return { user, access_token: tokens.access_token };
  }

  private async findByLogin(login: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { login: login },
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error while fetching user');
    }
  }

  async getProfile(accessToken: string): Promise<User> {
    let decodedToken: IPayloadType, user_id: number;

    try {
      decodedToken = await this.jwtService.verify(accessToken, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
      user_id = decodedToken.id;
    } catch (error) {
      throw new UnauthorizedException('Token is not valid');
    }

    const user = await this.userRepository.findOne({ where: { id: user_id } });

    if (!user) {
      throw new NotFoundException('User not found with such id');
    }

    return user;
  }

  async logout(refreshToken: string, res: Response) {
    const userData: IPayloadType = await this.jwtService.decode(refreshToken);

    if (!userData) {
      throw new ForbiddenException('Invalid refresh token');
    }

    const user = await this.userRepository.findOne({
      where: { id: userData.id },
    });

    res.clearCookie('refresh_token');

    const response = {
      message: 'Successfully logged out',
      user: user,
    };

    return response;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getTokens(user: User) {
    let jwtPayload: any;

    jwtPayload = {
      id: user.id,
      login: user.login,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async getUserByRelation(user_ids: number[]): Promise<User[]> {
    const users = await this.userRepository.find({
      where: { id: In(user_ids) },
      relations: ['courses'],
    });
    if (!users.length) {
      throw new NotFoundException('File not found');
    }

    return users;
  }
}
