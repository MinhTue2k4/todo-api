import express, {type Express, type Request, type Response} from 'express';
const app:Express = express() //returns an object "application" that having methods
const port = 3000;

app.get('/todos', (req:Request, res: Response) => {
    res.json([]);
})

app.listen(port, ()=> {
    console.log(`example on port ${port}`);
})
