import express from 'express';
import dotenv from 'dotenv';
import UserRouter from './routes/User';
import UploadRouter from './routes/Upload';
import StorageRouter from './routes/Storage';
import fs from 'fs';

dotenv.config();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/uploads/:file', (req, res) => {
    fs.readFile(__dirname + '/storage/profile/' + req.params.file, (err, data) => {
        if (err) {
            return res.status(404).send('File not found.');
        }
        return res.end(data);
    });
});

app.use('/user', UserRouter)
app.use('/upload', UploadRouter)
app.use('/storage', StorageRouter);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.listen(3000, () => {
    console.log(`Server running at ${host}:${port}/`);
});