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
exports.CourseService = void 0;
const user_service_1 = require("./../user/user.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const course_entity_1 = require("./entities/course.entity");
const files_service_1 = require("../files/files.service");
let CourseService = class CourseService {
    constructor(courseRepository, fileService, userService) {
        this.courseRepository = courseRepository;
        this.fileService = fileService;
        this.userService = userService;
    }
    async create(createCourseDto) {
        const course = this.courseRepository.create(createCourseDto);
        return this.courseRepository.save(course);
    }
    async findAll(params) {
        const { page = 1, limit = 10 } = params;
        const skip = (page - 1) * limit;
        const [courses, total] = await this.courseRepository.findAndCount({
            take: limit,
            skip,
        });
        return { data: courses, total };
    }
    async findOne(id) {
        const course = await this.courseRepository.findOne({ where: { id } });
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID ${id} not found`);
        }
        return course;
    }
    async update(id, updateCourseDto) {
        const course = await this.findOne(id);
        this.courseRepository.merge(course, updateCourseDto);
        return this.courseRepository.save(course);
    }
    async remove(id) {
        const course = await this.findOne(id);
        await this.courseRepository.remove(course);
    }
    async enrollFileToCourse(setCourseFileDto) {
        const { course_id, file_ids } = setCourseFileDto;
        const course = await this.findOne(course_id);
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        const files = await this.fileService.getFileByRelation(file_ids);
        course.files = files;
        return this.courseRepository.save(course);
    }
    async removeFileFromCourse(courseId, fileId) {
        const course = await this.courseRepository.findOne({
            where: { id: courseId },
            relations: ['files'],
        });
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        course.files = course.files.filter((file) => file.id !== fileId);
        return this.courseRepository.save(course);
    }
    async enrollUserToCourse(setCourseUserDto) {
        const { course_id, user_ids } = setCourseUserDto;
        const course = await this.findOne(course_id);
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        const users = await this.userService.getUserByRelation(user_ids);
        course.users = users;
        return this.courseRepository.save(course);
    }
    async removeUserFromCourse(courseId, userId) {
        const course = await this.courseRepository.findOne({
            where: { id: courseId },
            relations: ['files'],
        });
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        course.users = course.users.filter((user) => user.id !== userId);
        return this.courseRepository.save(course);
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        files_service_1.FilesService,
        user_service_1.UserService])
], CourseService);
//# sourceMappingURL=course.service.js.map