import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class SetCourseUserDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  course_id: number;

  @IsNotEmpty()
  user_ids: number[];
}
