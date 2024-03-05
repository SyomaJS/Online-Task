import { UserService } from './../user/user.service';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FilesService } from '../files/files.service';
import { SetCourseFileDto } from './dto/set-course-file.dto';
import { SetCourseUserDto } from './dto/set-user-course.dto';
export declare class CourseService {
    private readonly courseRepository;
    private readonly fileService;
    private readonly userService;
    constructor(courseRepository: Repository<Course>, fileService: FilesService, userService: UserService);
    create(createCourseDto: CreateCourseDto): Promise<Course>;
    findAll(params: {
        page?: number;
        limit?: number;
    }): Promise<{
        data: Course[];
        total: number;
    }>;
    findOne(id: number): Promise<Course>;
    update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course>;
    remove(id: number): Promise<void>;
    enrollFileToCourse(setCourseFileDto: SetCourseFileDto): Promise<Course>;
    removeFileFromCourse(courseId: number, fileId: number): Promise<Course>;
    enrollUserToCourse(setCourseUserDto: SetCourseUserDto): Promise<Course>;
    removeUserFromCourse(courseId: number, userId: number): Promise<Course>;
}
