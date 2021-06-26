import {MediaService} from './api/mediaService';
import {unlinkSync} from 'fs';

class Service implements MediaService {
    uploadOne(file: Express.Multer.File): string {
        unlinkSync(file.path);
        return file.path;
    }

    uploadMany(files?: Express.Multer.File[]): string[] {
        throw new Error('Method not implemented.');
    }

    deleteOne(file?: Express.Multer.File): string {
        throw new Error('Method not implemented.');
    }

    deleteMany(files?: Express.Multer.File[]): string[] {
        throw new Error('Method not implemented.');
    }

}

export const MediaServiceImpl = new Service();