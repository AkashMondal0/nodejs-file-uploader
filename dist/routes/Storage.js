"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
router.get('/:folderName/:file', (req, res) => {
    let pathName = path_1.default.join(__dirname, `../storage/`, req.params.folderName, req.params.file);
    fs_1.default.readFile(pathName, (err, data) => {
        if (err) {
            return res.status(404).send('File not found.');
        }
        return res.end(data);
    });
});
exports.default = router;
