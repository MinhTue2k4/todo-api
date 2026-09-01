"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)(); //returns an object "application" that having methods
const port = 3000;
let nextId = 2;
app.use(express_1.default.json());
;
const todos = [
    {
        title: "Viết code mầm non",
        id: 1,
        done: false
    }
];
//checklist
app.get('/todos', (req, res) => {
    res.json(todos);
});
//create new 
app.post('/todos', (req, res) => {
    if (!req.body.title || req.body.done === undefined) {
        res.status(400).json({ message: "Bad request 400 error" });
        return;
    }
    const newTodo = {
        title: req.body.title,
        id: nextId++,
        done: req.body.done
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});
//read an item  
app.get('/todos/:id', (req, res) => {
    const id = Number(req.params.id);
    const todo = todos.find(todo => todo.id === id);
    if (!todo) {
        res.status(404).json({ message: "Not found! 404 error" });
    }
    else {
        res.json(todo);
    }
});
// update an item
app.put('/todos/:id', (req, res) => {
    const id = Number(req.params.id);
    const todo = todos.find(todo => todo.id === id);
    if (!todo) {
        res.status(404).json({ message: "Not found! 404 error" });
        return;
    }
    if (!req.body.title || req.body.done === undefined) {
        res.status(400).json({ message: "Bad request 400 error" });
        return;
    }
    todo.title = req.body.title;
    todo.done = req.body.done;
    res.json(todo);
});
//delete an item
app.delete('/todos/:id', (req, res) => {
    const id = Number(req.params.id);
    const deleteIndex = todos.findIndex(todo => todo.id === id);
    /*findIndex trả về vị trí index đầu tiên mà thỏa mãn điều kiện.
    If not, it returns -1, indicating that no element passed the test.*/
    if (deleteIndex === -1) {
        res.status(404).json({ message: 'Not found! 404 error' });
        return;
    }
    todos.splice(deleteIndex, 1); //not 0 because splice(start, deleteCount) => deleteCount = 1 (vì chỉ có xóa 1 phần tử thôi mà)
    res.json({ message: 'Deleted!' });
});
app.listen(port, () => {
    console.log(`example on port ${port}`);
});
