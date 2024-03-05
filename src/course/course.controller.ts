import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { SetCourseFileDto } from './dto/set-course-file.dto';
import { SetCourseUserDto } from './dto/set-user-course.dto';
import { JwtAutGuard } from '../guards/auth.guard';

@Controller('course')
@ApiTags('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(JwtAutGuard)
  @Post('create')
  @ApiOperation({ summary: 'Create a new course' })
  @ApiBody({ type: CreateCourseDto })
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @UseGuards(JwtAutGuard)
  @Get('get-all')
  @ApiOperation({ summary: 'Get all courses' })
  @ApiQuery({ name: 'page', type: 'number' })
  @ApiQuery({ name: 'limit', type: 'number' })
  findAll(@Query() params: { page: number; limit: number }) {
    return this.courseService.findAll(params);
  }

  @UseGuards(JwtAutGuard)
  @Get('get/:id')
  @ApiOperation({ summary: 'Get a course by ID' })
  @ApiResponse({ status: 200, description: 'The course with the specified ID' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @UseGuards(JwtAutGuard)
  @Put('update/:id')
  @ApiOperation({ summary: 'Update a course by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateCourseDto })
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @UseGuards(JwtAutGuard)
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a course by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }

  @UseGuards(JwtAutGuard)
  @Post('set-course-file')
  @ApiOperation({ summary: 'Set course files' })
  @ApiBody({ type: SetCourseFileDto })
  setCourseFiles(@Body() setCourseFileDto: SetCourseFileDto) {
    return this.courseService.enrollFileToCourse(setCourseFileDto);
  }

  @UseGuards(JwtAutGuard)
  @Post('set-course-user')
  @ApiOperation({ summary: 'Set course user' })
  @ApiBody({ type: SetCourseUserDto })
  setCourseUser(@Body() setCourseUserDto: SetCourseUserDto) {
    return this.courseService.enrollUserToCourse(setCourseUserDto);
  }
}
