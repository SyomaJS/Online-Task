"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const redis_service_1 = require("../redis/redis.service");
const typeorm_3 = require("typeorm");
let UserService = class UserService {
    constructor(userRepository, jwtService, redisService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.redisService = redisService;
    }
    async signup(createUserDto) {
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
    async signin(signInUserDto, res) {
        const { login, password } = signInUserDto;
        const user = await this.findByLogin(login);
        if (!user) {
            throw new common_1.UnauthorizedException('Login or password incorrect');
        }
        const isMatch = await bcrypt.compare(password, user.hashed_password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Login or password incorrect');
        }
        const tokens = await this.getTokens(user);
        res.cookie('refresh_token', tokens.refresh_token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return { user, access_token: tokens.access_token };
    }
    async findByLogin(login) {
        try {
            const user = await this.userRepository.findOne({
                where: { login: login },
            });
            return user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error while fetching user');
        }
    }
    async getProfile(accessToken) {
        let decodedToken, user_id;
        try {
            decodedToken = await this.jwtService.verify(accessToken, {
                secret: process.env.ACCESS_TOKEN_KEY,
            });
            user_id = decodedToken.id;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Token is not valid');
        }
        const user = await this.userRepository.findOne({ where: { id: user_id } });
        if (!user) {
            throw new common_1.NotFoundException('User not found with such id');
        }
        return user;
    }
    async logout(refreshToken, res) {
        const userData = await this.jwtService.decode(refreshToken);
        if (!userData) {
            throw new common_1.ForbiddenException('Invalid refresh token');
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
    async findOne(id) {
        const user = await this.userRepository.findOne({ where: { id: id } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async getTokens(user) {
        let jwtPayload;
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
    async getUserByRelation(user_ids) {
        const users = await this.userRepository.find({
            where: { id: (0, typeorm_3.In)(user_ids) },
            relations: ['courses'],
        });
        if (!users.length) {
            throw new common_1.NotFoundException('File not found');
        }
        return users;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        redis_service_1.RedisService])
], UserService);
//# sourceMappingURL=user.service.js.map