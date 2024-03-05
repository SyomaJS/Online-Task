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
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const uuid = require("uuid");
const fs = require("fs");
const typeorm_1 = require("@nestjs/typeorm");
const file_entity_1 = require("./entities/file.entity");
const typeorm_2 = require("typeorm");
let FilesService = class FilesService {
    constructor(fileRepository) {
        this.fileRepository = fileRepository;
    }
    async createFileReturnName(file, req, createFileDto) {
        try {
            const fileName = uuid.v4() + `.${file.mimetype.split('/')[1]}`;
            const filePath = path.resolve(__dirname, '../../', 'media');
            if (!fs.existsSync(file)) {
                fs.mkdir(filePath, { recursive: true }, (err) => {
                    if (err) {
                        throw new common_1.BadRequestException(err.message);
                    }
                });
            }
            try {
                fs.writeFileSync(path.join(filePath, fileName), file.buffer);
            }
            catch (error) {
                console.log(error);
                throw new common_1.InternalServerErrorException(error);
            }
            const full_filename = `${req.protocol}://${req.hostname}:${req.socket.localPort}/api/media/${fileName}`;
            const pathOfFile = path.resolve(__dirname, '../../', 'media', fileName);
            const { title } = createFileDto;
            const newFile = this.fileRepository.create({
                filename: full_filename,
                filepath: pathOfFile,
                title: title,
            });
            await this.fileRepository.save(newFile);
            return newFile;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getFileById(id) {
        const file = await this.fileRepository.findOne({ where: { id } });
        if (!file) {
            throw new common_1.NotFoundException('File not found');
        }
        return file;
    }
    async getFileByRelation(fileIds) {
        const files = await this.fileRepository.find({
            where: { id: (0, typeorm_2.In)(fileIds) },
            relations: ['courses'],
        });
        if (!files.length) {
            throw new common_1.NotFoundException('File not found');
        }
        return files;
    }
    async deleteFile(id) {
        const file = await this.getFileById(id);
        try {
            fs.unlinkSync(file.filepath);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to delete file');
        }
        await this.fileRepository.delete(id);
        return { message: 'File deleted successfully' };
    }
    async updateFileTitle(id, updateFileDto) {
        const { title } = updateFileDto;
        const file = await this.getFileById(id);
        if (title) {
            file.title = title;
        }
        return this.fileRepository.save(file);
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(file_entity_1.File)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FilesService);
//# sourceMappingURL=files.service.js.map