import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { SetCourseFileDto } from './dto/set-course-file.dto';
import { SetCourseUserDto } from './dto/set-user-course.dto';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    create(createCourseDto: CreateCourseDto): Promise<import("./entities/course.entity").Course>;
    findAll(params: {
        page: number;
        limit: number;
    }): Promise<{
        data: import("./entities/course.entity").Course[];
        total: number;
    }>;
    findOne(id: string): Promise<import("./entities/course.entity").Course>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<import("./entities/course.entity").Course>;
    remove(id: string): Promise<void>;
    setCourseFiles(setCourseFileDto: SetCourseFileDto): Promise<import("./entities/course.entity").Course>;
    setCourseUser(setCourseUserDto: SetCourseUserDto): Promise<import("./entities/course.entity").Course>;
}
