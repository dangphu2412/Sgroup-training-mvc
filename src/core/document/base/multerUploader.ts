import { Request } from 'express-serve-static-core';
import multer, {diskStorage, FileFilterCallback,} from 'multer';
import { extname } from 'path/posix';

interface MulterLimitation {
    /** Maximum size of each form field name in bytes. (Default: 100) */
    fieldNameSize?: number;
    /** Maximum size of each form field value in bytes. (Default: 1048576) */
    fieldSize?: number;
    /** Maximum number of non-file form fields. (Default: Infinity) */
    fields?: number;
    /** Maximum size of each file in bytes. (Default: Infinity) */
    fileSize?: number;
    /** Maximum number of file fields. (Default: Infinity) */
    files?: number;
    /** Maximum number of parts (non-file fields + files). (Default: Infinity) */
    parts?: number;
    /** Maximum number of headers. (Default: 2000) */
    headerPairs?: number;
};

type callbackMulter = (error: Error | null, filename: string) => void

export abstract class MulterUploader {
    private static DEFAILT_FILE_SIZE = 1024 * 1024;

    private destination: string;
    private filterFileExtension: Array<string> = [];

    constructor(key, file) {

    }

    protected extractFileName(req: Request, file: Express.Multer.File, cb: callbackMulter) {
        return cb(null, `${file.fieldname}-${Date.now()}${file.mimetype}`);
    }

    protected filterFile(req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
        var ext = extname(file.originalname);
        if(!this.filterFileExtension.includes(ext)) {
            return cb(new Error(`Extension is not allowed. Must be one of ${this.filterFileExtension.toString()}`))
        }
        return cb(null, true);
    }

    protected getLimitConfig(): MulterLimitation {
        return {
            fileSize: MulterUploader.DEFAILT_FILE_SIZE,
        }
    }

    getUploader() {
        return multer({
            storage: diskStorage({
                destination: this.destination,
                filename: this.extractFileName
            }),
            limits: this.getLimitConfig(),
            fileFilter: this.filterFile,
        });
    }
}