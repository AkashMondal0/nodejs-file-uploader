import { Router } from 'express';
import fs from 'fs';
const router = Router();

router.get('/profile/:file', (req, res) => {
    fs.readFile(__dirname + '/storage/profile/' + req.params.file, (err, data) => {
        if (err) {
            return res.status(404).send('File not found.');
        }
        return res.send(data);
    });
});

export default router;