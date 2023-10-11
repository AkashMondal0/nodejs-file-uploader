import { Router } from 'express';
import fs from 'fs';
import path from 'path';
const router = Router();

router.get('/:userId/:fileName', (req, res) => {
    let pathName = path.join(__dirname, `../storage/`, req.params.userId, req.params.fileName);
    fs.readFile(pathName, (err, data) => {
        if (err) {
            return res.status(404).send('File not found.');
        }
        return res.end(data);
    });
});

export default router;