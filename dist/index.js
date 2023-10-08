"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("./routes/User"));
const Upload_1 = __importDefault(require("./routes/Upload"));
const Storage_1 = __importDefault(require("./routes/Storage"));
dotenv_1.default.config();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.use('/user', User_1.default);
app.use('/upload', Upload_1.default);
app.use('/storage', Storage_1.default);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.listen(3000, () => {
    console.log(`Server running at ${host}:${port}/`);
});
