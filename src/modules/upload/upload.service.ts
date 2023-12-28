import { Injectable, NotFoundException } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadService {
    async uploadFile(file: any, nameFolder?: string): Promise<string> {
        try {
            const result: UploadApiResponse = await cloudinary.uploader.upload(file.path, {
                folder: nameFolder ?? 'nestjs-multer'
            });
            return result.url;
        } catch (error) {
            throw new NotFoundException('File upload failed');
        }
    }
}
