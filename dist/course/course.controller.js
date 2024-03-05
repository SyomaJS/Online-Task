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
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const course_service_1 = require("./course.service");
const create_course_dto_1 = require("./dto/create-course.dto");
const update_course_dto_1 = require("./dto/update-course.dto");
const set_course_file_dto_1 = require("./dto/set-course-file.dto");
const set_user_course_dto_1 = require("./dto/set-user-course.dto");
const auth_guard_1 = require("../guards/auth.guard");
let CourseController = class CourseController {
    constructor(courseService) {
        this.courseService = courseService;
    }
    create(createCourseDto) {
        return this.courseService.create(createCourseDto);
    }
    findAll(params) {
        return this.courseService.findAll(params);
    }
    findOne(id) {
        return this.courseService.findOne(+id);
    }
    update(id, updateCourseDto) {
        return this.courseService.update(+id, updateCourseDto);
    }
    remove(id) {
        return this.courseService.remove(+id);
    }
    setCourseFiles(setCourseFileDto) {
        return this.courseService.enrollFileToCourse(setCourseFileDto);
    }
    setCourseUser(setCourseUserDto) {
        return this.courseService.enrollUserToCourse(setCourseUserDto);
    }
};
exports.CourseController = CourseController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAutGuard),
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new course' }),
    (0, swagger_1.ApiBody)({ type: create_course_dto_1.CreateCourseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAutGuard),
    (0, common_1.Get)('get-all'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all courses' }),
    (0, swagger_1.ApiQuery)({ name: 'page', type: 'number' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: 'number' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAutGuard),
    (0, common_1.Get)('get/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a course by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The course with the specified ID' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Course not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAutGuard),
    (0, common_1.Put)('update/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a course by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    (0, swagger_1.ApiBody)({ type: update_course_dto_1.UpdateCourseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_course_dto_1.UpdateCourseDto]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAutGuard),
    (0, common_1.Delete)('delete/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a course by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAutGuard),
    (0, common_1.Post)('set-course-file'),
    (0, swagger_1.ApiOperation)({ summary: 'Set course files' }),
    (0, swagger_1.ApiBody)({ type: set_course_file_dto_1.SetCourseFileDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [set_course_file_dto_1.SetCourseFileDto]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "setCourseFiles", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAutGuard),
    (0, common_1.Post)('set-course-user'),
    (0, swagger_1.ApiOperation)({ summary: 'Set course user' }),
    (0, swagger_1.ApiBody)({ type: set_user_course_dto_1.SetCourseUserDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [set_user_course_dto_1.SetCourseUserDto]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "setCourseUser", null);
exports.CourseController = CourseController = __decorate([
    (0, common_1.Controller)('course'),
    (0, swagger_1.ApiTags)('courses'),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
//# sourceMappingURL=course.controller.js.map