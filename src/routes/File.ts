import { Router } from 'express';
import { uploadFile } from '../service/multer';
const router = Router();
import fs from 'fs';
import path from 'path';

//! upload single file
router.post(`/single/:userId/`, uploadFile("single"), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }
    //example - http://localhost:3000/file/1696707749075-FB_IMG_1664296698023.jpg
    return res.status(200).send(`${process.env.HOST}/file/${req.params.userId}/${req.file.filename}`);
    // return res.redirect(`${process.env.PRODUCTION_HOST}/file/${req.params.userId}/${req.file.filename}`);
});

//! upload multiple files
router.post('/multiple/:userId/', uploadFile("multiple", 5), function (req, res, next) {
    console.log(!req.files);
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    const files = req.files as Express.Multer.File[];
    let fileLocations: string[] = [];

    files.forEach((file: Express.Multer.File) => {
        fileLocations.push(`${process.env.HOST}/file/${req.params.userId}/${file.filename}`);
    })
    return res.status(200).json({ urls: fileLocations })
})

//! get file
router.get('/:userId/:fileName', (req, res) => {
    let pathName = path.join(__dirname, `../storage/`, req.params.userId, req.params.fileName);
    const stream = fs.createReadStream(pathName)
    return stream.pipe(res).on('error', (err) => {
        console.log(err)
        return res.status(404).send('File not found.');
    })
});

export default router;