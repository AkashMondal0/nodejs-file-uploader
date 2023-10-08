import multer from 'multer';
import path from 'path';
import fs from 'fs';

export type Upload_Routes = "profile" | "post" | "comment" | "reply"

const uploadFile = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            let pathName = path.join(__dirname, `../storage/`, req.params.folderName);
            let stat = null;
            try {
                stat = fs.statSync(pathName);
            }
            catch (err) {
                fs.mkdirSync(pathName);
            }
            if (stat && !stat.isDirectory()) {
                throw new Error('Directory cannot be created');
            }
            cb(null, pathName);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });
    const upload = multer({ storage: storage, dest: `../storage/` });
    return upload.single("image");
}


export default uploadFile;