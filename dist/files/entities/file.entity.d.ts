import { Course } from '../../course/entities/course.entity';
export declare class File {
    id: number;
    title: string;
    filename: string;
    filepath: string;
    courses: Course[];
}
