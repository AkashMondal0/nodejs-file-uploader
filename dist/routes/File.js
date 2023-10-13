"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = require("../service/multer");
const router = (0, express_1.Router)();
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
//! upload single file
router.post(`/single/:userId/`, (0, multer_1.uploadFile)("single"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }
    //example - http://localhost:3000/file/1696707749075-FB_IMG_1664296698023.jpg
    return res.status(200).send(`${process.env.PRODUCTION_HOST}/file/${req.params.userId}/${req.file.filename}`);
}));
//! upload multiple files
router.post('/multiple/:userId/', (0, multer_1.uploadFile)("multiple", 5), function (req, res, next) {
    console.log(!req.files);
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    const files = req.files;
    let fileLocations = [];
    files.forEach((file) => {
        fileLocations.push(`${process.env.PRODUCTION_HOST}/file/${req.params.userId}/${file.filename}`);
    });
    return res.status(200).json({ urls: fileLocations });
});
//! get file
router.get('/:userId/:fileName', (req, res) => {
    let pathName = path_1.default.join(__dirname, `../storage/`, req.params.userId, req.params.fileName);
    const stream = fs_1.default.createReadStream(pathName);
    return stream.pipe(res).on('error', (err) => {
        console.log(err);
        return res.status(404).send('File not found.');
    });
});
exports.default = router;
