export interface MediaService {
    uploadOne(file?: Express.Multer.File): Promise<string>;

    uploadMany(files?: Array<Express.Multer.File>): Promise<Array<string>>

    deleteOne(file?: Express.Multer.File): Promise<string>;

    deleteMany(files?: Array<Express.Multer.File>): Promise<Array<string>>
}
