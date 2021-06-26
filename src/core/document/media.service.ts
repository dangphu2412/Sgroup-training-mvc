import {MediaService} from './api/mediaService';
import {unlinkSync} from 'fs';
import {cloudinary} from '../../config/cloudinary.config';

class Service implements MediaService {
    uploadMany(files?: Express.Multer.File[]): Promise<string[]> {
        throw new Error('Method not implemented.');
    }

    deleteOne(file?: Express.Multer.File): Promise<string> {
        throw new Error('Method not implemented.');
    }

    deleteMany(files?: Express.Multer.File[]): Promise<string[]> {
        throw new Error('Method not implemented.');
    }

    async uploadOne(file: Express.Multer.File): Promise<string> {
        const response = await cloudinary.upload(file.path, {
            folder: '/test'
        })
        console.log(response);

        unlinkSync(file.path);
        return response.secure_url;
    }
}

export const MediaServiceImpl = new Service();
