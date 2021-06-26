import express from 'express';
import {ImageUploader} from './imageUploader';
import {MediaController} from './media.controller';

const router = express.Router();

router.post('/', ImageUploader.toUploadHandler, MediaController.uploadOne);

export default router;
