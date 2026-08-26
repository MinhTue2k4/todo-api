"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)(); //returns an object "application" that having methods
const port = 3000;
app.get('/todos', (req, res) => {
    res.json([]);
});
app.listen(port, () => {
    console.log(`example on port ${port}`);
});
