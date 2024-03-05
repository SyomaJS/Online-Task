import { UserService } from './user.service';
import { CreateUserDto, SignInUserDto } from './dto/create-user.dto';
import { Response } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signup(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    signin(signInUserDto: SignInUserDto, res: Response): Promise<{
        user: import("./entities/user.entity").User;
        access_token: string;
    }>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    logout(refreshToken: string, res: Response): Promise<{
        message: string;
        user: import("./entities/user.entity").User;
    }>;
    getProfile(accessToken: string): Promise<import("./entities/user.entity").User>;
}
