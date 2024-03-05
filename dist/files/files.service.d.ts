import { UpdateFileDto } from './dto/update-file.dto';
import { CreateFileDto } from './dto/create-file.dto';
import { Request } from 'express';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';
export declare class FilesService {
    private readonly fileRepository;
    constructor(fileRepository: Repository<File>);
    createFileReturnName(file: any, req: Request, createFileDto: CreateFileDto): Promise<File>;
    getFileById(id: number): Promise<File>;
    getFileByRelation(fileIds: number[]): Promise<File[]>;
    deleteFile(id: number): Promise<{
        message: string;
    }>;
    updateFileTitle(id: number, updateFileDto: UpdateFileDto): Promise<File>;
}
