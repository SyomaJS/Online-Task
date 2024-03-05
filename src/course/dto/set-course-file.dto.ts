import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class SetCourseFileDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  course_id: number;

  @IsNotEmpty()
  file_ids: number[];
}
