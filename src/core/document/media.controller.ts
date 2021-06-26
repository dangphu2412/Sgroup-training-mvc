import {Request, Response} from 'express-serve-static-core';
import { MediaService } from './api/mediaService';
import { MediaServiceImpl } from './media.service';

class Controlelr {
    private mediaService: MediaService;

    constructor(mediaService: MediaService) {
        this.mediaService = mediaService;
    }

    uploadOne = (req: Request, res: Response) => {
        const src = this.mediaService.uploadOne(req.file);

        return res.status(200).json({
            src
        });
    }
}

export const MediaController = new Controlelr(MediaServiceImpl);
