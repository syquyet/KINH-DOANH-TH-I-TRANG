import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) { }

    @Post('upload-single')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file): Promise<string> {
        return this.uploadService.uploadFile(file,"avatar");
    }

    @Post('upload-multiple')
    @UseInterceptors(FilesInterceptor('files', 5))
    async uploadFiles(@UploadedFiles() files): Promise<string[]> {
        const uploadedFileUrls: string[] = await Promise.all(
            files.map(async (file) => await this.uploadService.uploadFile(file,"avatar")),
        );
        return uploadedFileUrls;
    }
}
