import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { FilesModule } from '../files/files.module';
import { File } from '../files/entities/file.entity';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, File]),
    FilesModule,
    UserModule,
    JwtModule,
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
