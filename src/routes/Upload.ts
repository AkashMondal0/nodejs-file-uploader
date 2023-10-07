import { Router } from 'express';
import uploadFile, { Upload_Routes } from '../service/multer';
const router = Router();

const profile: Upload_Routes = "profile"

router.post(`/${profile}`, uploadFile(profile), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }
    return res.json({ "fileUrl": `${process.env.PRODUCTION_HOST}/storage/${profile}/${req.file.filename}` });
});


export default router;