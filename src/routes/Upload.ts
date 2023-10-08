import { Router } from 'express';
import uploadFile, { Upload_Routes } from '../service/multer';
const router = Router();

router.post(`/:folderName/`, uploadFile(), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }
    // http://localhost:3000/storage/profile/skysolo/1696707749075-FB_IMG_1664296698023.jpg
    return res.redirect(`${process.env.PRODUCTION_HOST}/storage/${req.params.folderName}/${req.file.filename}`)
});


export default router;