import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty({ example: 'Bootcampt ' })
  course_name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: 100 })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: 6 })
  duration: number;
}
