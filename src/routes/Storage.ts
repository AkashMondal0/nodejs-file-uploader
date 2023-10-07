import { Router } from 'express';
import fs from 'fs';
import path from 'path';
const router = Router();

router.get('/:folderName/:file', (req, res) => {
    let pathName = path.join(__dirname, `../storage/`, req.params.folderName, req.params.file);
    fs.readFile(pathName, (err, data) => {
        if (err) {
            return res.status(404).send('File not found.');
        }
        return res.end(data);
    });

});

export default router;