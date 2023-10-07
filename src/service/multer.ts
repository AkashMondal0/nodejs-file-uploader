import multer from 'multer';
export type Upload_Routes = "profile" | "post" | "comment" | "reply"

const uploadFile = (type: Upload_Routes) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `./src/storage/${type}`);
        },
        filename: (req, file, cb) => {
            cb(null,Date.now() + '-' + file.originalname);
        }
    });
    const upload = multer({ storage: storage });
    return upload.single(type);
}


export default uploadFile;