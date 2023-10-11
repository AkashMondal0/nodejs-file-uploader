import { Router } from 'express';
import { uploadFile } from '../service/multer';
const router = Router();


//! upload single file
router.post(`/single/:userId/`, uploadFile("single"), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }
    //example - http://localhost:3000/storage/1696707749075-FB_IMG_1664296698023.jpg
    return res.status(200).send(`${process.env.PRODUCTION_HOST}/storage/${req.params.userId}/${req.file.filename}`);
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
        fileLocations.push(`${process.env.PRODUCTION_HOST}/storage/${req.params.userId}/${file.filename}`);
    })
    return res.status(200).json({ urls: fileLocations })
})


export default router;