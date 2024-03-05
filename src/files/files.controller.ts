import {
  Controller,
  Param,
  Post,
  Req,
  Get,
  UploadedFile,
  UseInterceptors,
  Res,
  Body,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAutGuard } from '../guards/auth.guard';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @UseGuards(JwtAutGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({ type: CreateFileDto })
  async uploadFile(
    @UploadedFile() file: any,
    @Req() req: Request,
    @Body() createFileDto: CreateFileDto,
  ) {
    const fileName = await this.filesService.createFileReturnName(
      file,
      req,
      createFileDto,
    );
    return fileName;
  }

  @UseGuards(JwtAutGuard)
  @Get('download/:id')
  @ApiParam({ name: 'id', description: 'File ID' })
  async downloadFile(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const file = await this.filesService.getFileById(+id);

    if (!file) {
      res.status(404).send('File not found');
      return;
    }

    res.download(file.filepath, file.filename);
  }
}
