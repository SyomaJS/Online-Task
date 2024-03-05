import { File } from '../../files/entities/file.entity';
import { User } from '../../user/entities/user.entity';
export declare class Course {
    id: number;
    course_name: string;
    price: number;
    duration: number;
    files: File[];
    users: User[];
}
