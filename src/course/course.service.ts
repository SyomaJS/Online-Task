import { UserService } from './../user/user.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { In } from 'typeorm';
import { FilesService } from '../files/files.service';
import { SetCourseFileDto } from './dto/set-course-file.dto';
import { SetCourseUserDto } from './dto/set-user-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly fileService: FilesService,
    private readonly userService: UserService,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.courseRepository.create(createCourseDto);
    return this.courseRepository.save(course);
  }

  async findAll(params: {
    page?: number;
    limit?: number;
  }): Promise<{ data: Course[]; total: number }> {
    const { page = 1, limit = 10 } = params;
    const skip = (page - 1) * limit;

    const [courses, total] = await this.courseRepository.findAndCount({
      take: limit,
      skip,
    });

    return { data: courses, total };
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.findOne(id);
    this.courseRepository.merge(course, updateCourseDto);
    return this.courseRepository.save(course);
  }

  async remove(id: number): Promise<void> {
    const course = await this.findOne(id);
    await this.courseRepository.remove(course);
  }

  async enrollFileToCourse(
    setCourseFileDto: SetCourseFileDto,
  ): Promise<Course> {
    const { course_id, file_ids } = setCourseFileDto;
    const course = await this.findOne(course_id);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const files = await this.fileService.getFileByRelation(file_ids);

    course.files = files;

    return this.courseRepository.save(course);
  }

  async removeFileFromCourse(
    courseId: number,
    fileId: number,
  ): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['files'],
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    course.files = course.files.filter((file) => file.id !== fileId);

    return this.courseRepository.save(course);
  }

  // * Add or remove user from course

  async enrollUserToCourse(
    setCourseUserDto: SetCourseUserDto,
  ): Promise<Course> {
    const { course_id, user_ids } = setCourseUserDto;
    const course = await this.findOne(course_id);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const users = await this.userService.getUserByRelation(user_ids);

    course.users = users;

    return this.courseRepository.save(course);
  }

  async removeUserFromCourse(
    courseId: number,
    userId: number,
  ): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['files'],
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    course.users = course.users.filter((user) => user.id !== userId);

    return this.courseRepository.save(course);
  }
}
