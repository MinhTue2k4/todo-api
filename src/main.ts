import express, { type Express, type Request, type Response } from 'express';
const app: Express = express() //returns an object "application" that having methods
const port = 3000;
let nextId = 2;

// Middleware là một đoạn code mà request sẽ đi qua trước khi tới route tiếp theo.
app.use(express.json()); //register a middleware 
app.use((req:Request, res:Response, next) => {
    const start = Date.now() //time start 
    res.on('finish', () => {
        const processTime = Date.now() - start; //time end - time start = run time of the process
        console.log(`${req.method} ${req.path} - ${processTime}ms`)
    }) 
    next(); //does NOT block request, but without this, request from clients will just stop at one route
});
interface Todo {
    title: string;
    id: number;
    done: boolean;
};
const todos: Todo[] = [
    {
        title: "Viết code mầm non",
        id: 1,
        done: false
    }
]

//checklist
app.get('/todos', (req: Request, res: Response) => {
    res.json(todos);
})

//create new 
app.post('/todos', (req: Request, res: Response) => {
    if (!req.body.title || req.body.done === undefined) {
        res.status(400).json({ message: "Bad request 400 error" })
        return;
    }
    const newTodo: Todo = {
        title: req.body.title,
        id: nextId++,
        done: req.body.done
    }
    todos.push(newTodo);
    res.status(201).json(newTodo);
})

//read an item  
app.get('/todos/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const todo = todos.find(todo => todo.id === id)
    if (!todo) {
        res.status(404).json({ message: "Not found! 404 error" })
    } else {
        res.json(todo)
    }
})

// update an item
app.put('/todos/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const todo = todos.find(todo => todo.id === id)
    if (!todo) {
        res.status(404).json({ message: "Not found! 404 error" })
        return;
    }
    if (!req.body.title || req.body.done === undefined) {
        res.status(400).json({ message: "Bad request 400 error" })
        return;
    }
    todo.title = req.body.title;
    todo.done = req.body.done;
    res.json(todo);
})
//delete an item
app.delete('/todos/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deleteIndex = todos.findIndex(todo => todo.id === id);
    /*findIndex trả về vị trí index đầu tiên mà thỏa mãn điều kiện. 
    If not, it returns -1, indicating that no element passed the test.*/
    if (deleteIndex === -1) {
        res.status(404).json({ message: 'Not found! 404 error' })
        return;
    }
    todos.splice(deleteIndex, 1) //not 0 because splice(start, deleteCount) => deleteCount = 1 (vì chỉ có xóa 1 phần tử thôi mà)
    res.json({ message: 'Deleted!' })
})
app.listen(port, () => {
    console.log(`example on port ${port}`);
})
