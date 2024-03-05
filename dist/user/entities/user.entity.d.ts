import { Course } from '../../course/entities/course.entity';
interface IUserAttr {
    login: string;
    hashed_password: string;
}
export declare class User implements IUserAttr {
    id: number;
    login: string;
    hashed_password: string;
    courses: Course[];
}
export {};
