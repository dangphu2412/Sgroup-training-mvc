import {MulterUploader} from './base/multerUploader';

class Uploader extends MulterUploader {
    constructor() {
        super('file', `${process.cwd()}/upload`, ['.jpeg', '.jpg', '.png'])
    }

    getSizeUpload(): number {
        return MulterUploader.SINGLE_UPLOAD;
    }
}

export const ImageUploader = new Uploader();
