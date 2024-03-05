import { Repository } from 'typeorm';
import { CreateUserDto, SignInUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../redis/redis.service';
import { Response } from 'express';
export declare class UserService {
    private readonly userRepository;
    private readonly jwtService;
    private readonly redisService;
    constructor(userRepository: Repository<User>, jwtService: JwtService, redisService: RedisService);
    signup(createUserDto: CreateUserDto): Promise<User>;
    signin(signInUserDto: SignInUserDto, res: Response): Promise<{
        user: User;
        access_token: string;
    }>;
    logout(refreshToken: string, res: Response): Promise<{
        message: string;
        user: User;
    }>;
    private findByLogin;
    getProfile(accessToken: string): Promise<User>;
    findOne(id: number): Promise<User>;
    getTokens(user: User): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    getUserByRelation(user_ids: number[]): Promise<User[]>;
}
