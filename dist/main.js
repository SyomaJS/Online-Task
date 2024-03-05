"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const cookieParser = require("cookie-parser");
const start = async () => {
    try {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Online Courses')
            .setDescription('Project for students online courses')
            .setVersion('1.0.0')
            .addTag('NodeJS')
            .build();
        const PORT = process.env.PORT || 3333;
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.setGlobalPrefix('api');
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('/api/docs', app, document);
        app.enableCors({ origin: 'http://localhost:3000', credentials: true });
        (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule));
        app.use(cookieParser());
        app.useGlobalPipes(new common_1.ValidationPipe());
        (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
        await app.listen(PORT, () => {
            console.log(`Server running at ${PORT} port ✅`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
start();
//# sourceMappingURL=main.js.map