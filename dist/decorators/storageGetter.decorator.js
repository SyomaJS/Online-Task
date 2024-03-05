"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageGetter = void 0;
const common_1 = require("@nestjs/common");
exports.StorageGetter = (0, common_1.createParamDecorator)(async (data, context) => {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (authHeader) {
        const [_, refreshToken] = authHeader.split(' ');
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('Token is not found ');
        }
        return refreshToken;
    }
    else {
        return false;
    }
});
//# sourceMappingURL=storageGetter.decorator.js.map