import {NextFunction} from 'express';
import {Request, RequestHandler, Response} from 'express-serve-static-core';
import multer, {diskStorage, FileFilterCallback, Multer, MulterError} from 'multer';
import {extname} from 'path';

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
    public static SINGLE_UPLOAD = 1;

    private static DEFAILT_FILE_SIZE = 1024 * 1024;

    private key: string;

    private destination: string;

    private filterFileExtensions: Array<string> = [];

    constructor(key: string, destination: string, filterFileExtensions: Array<string>) {
        this.key = key;
        this.destination = destination;
        this.filterFileExtensions = filterFileExtensions;
    }

    abstract getSizeUpload(): number;

    protected extractFileName = (req: Request, file: Express.Multer.File, cb: callbackMulter) => {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }

    protected filterFile = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        const ext = extname(file.originalname);
        if(!this.filterFileExtensions.includes(ext)) {
            return cb(new MulterError('LIMIT_UNEXPECTED_FILE', this.filterFileExtensions.toString()))
        }
        return cb(null, true);
    }

    protected getLimitConfig(): MulterLimitation {
        return {
            fileSize: MulterUploader.DEFAILT_FILE_SIZE
        }
    }

    public toUploadHandler = (req: Request, res: Response, next: NextFunction) => {
        return this.getUploader()(req, res, err => {
            if (err instanceof MulterError) {
                return res.status(415).json({
                    message: err.message
                })
            }
            return next();
        })
    }

    public getUploader(): RequestHandler {
        const uploader: Multer = multer({
            storage: diskStorage({
                destination: this.destination,
                filename: this.extractFileName
            }),
            limits: this.getLimitConfig(),
            fileFilter: this.filterFile
        });

        if (this.getSizeUpload() === MulterUploader.SINGLE_UPLOAD) {
            return uploader.single(this.key);
        }

        return uploader.array(this.key, this.getSizeUpload());
    }
}
