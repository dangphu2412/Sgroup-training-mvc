export interface MediaService {
    uploadOne(file?: Express.Multer.File): string;

    uploadMany(files?: Array<Express.Multer.File>): Array<string>

    deleteOne(file?: Express.Multer.File): string;

    deleteMany(files?: Array<Express.Multer.File>): Array<string>
}
