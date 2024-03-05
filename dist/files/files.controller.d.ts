import { Request, Response } from 'express';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadFile(file: any, req: Request, createFileDto: CreateFileDto): Promise<import("./entities/file.entity").File>;
    downloadFile(id: string, res: Response): Promise<void>;
}
