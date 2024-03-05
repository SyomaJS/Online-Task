import { UpdateFileDto } from './dto/update-file.dto';
import { CreateFileDto } from './dto/create-file.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as path from 'path';
import * as uuid from 'uuid';
import * as fs from 'fs';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Repository, In } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}
  async createFileReturnName(
    file: any,
    req: Request,
    createFileDto: CreateFileDto,
  ): Promise<File> {
    try {
      const fileName = uuid.v4() + `.${file.mimetype.split('/')[1]}`;
      const filePath = path.resolve(__dirname, '../../', 'media');

      if (!fs.existsSync(file)) {
        fs.mkdir(filePath, { recursive: true }, (err) => {
          if (err) {
            throw new BadRequestException(err.message);
          }
        });
      }
      try {
        fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException(error);
      }

      const full_filename = `${req.protocol}://${req.hostname}:${req.socket.localPort}/api/media/${fileName}`;
      const pathOfFile = path.resolve(__dirname, '../../', 'media', fileName);
      const { title } = createFileDto;

      const newFile = this.fileRepository.create({
        filename: full_filename,
        filepath: pathOfFile,
        title: title,
      });
      await this.fileRepository.save(newFile);

      return newFile;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getFileById(id: number): Promise<File> {
    const file = await this.fileRepository.findOne({ where: { id } });
    if (!file) {
      throw new NotFoundException('File not found');
    }
    return file;
  }

  async getFileByRelation(fileIds: number[]): Promise<File[]> {
    const files = await this.fileRepository.find({
      where: { id: In(fileIds) },
      relations: ['courses'],
    });
    if (!files.length) {
      throw new NotFoundException('File not found');
    }

    return files;
  }

  async deleteFile(id: number): Promise<{ message: string }> {
    const file = await this.getFileById(id);
    try {
      fs.unlinkSync(file.filepath);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete file');
    }
    await this.fileRepository.delete(id);

    return { message: 'File deleted successfully' };
  }

  async updateFileTitle(
    id: number,
    updateFileDto: UpdateFileDto,
  ): Promise<File> {
    const { title } = updateFileDto;
    const file = await this.getFileById(id);
    if (title) {
      file.title = title;
    }
    return this.fileRepository.save(file);
  }
}
