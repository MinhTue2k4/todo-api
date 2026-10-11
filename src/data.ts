let nextId = 2;

export interface Todo {
    title: string;
    id: number;
    done: boolean;
}

const todos: Todo[] = [
    {
        title: "Viết code mầm non",
        id: 1,
        done: false
    }
];

export function getTodos(): Todo[] {
    const todo = [...todos]; 
    return todo;
}

export function addTodo(title: string, done: boolean): Todo {
    const newTodo: Todo = {
        title: title,
        id: nextId++,
        done: done
    };
    todos.push(newTodo);
    return newTodo;
}

export function getTodoByID(id: number): Todo | undefined {
    return todos.find(todo => todo.id === id);
}

export function updateTodoByID(id:number, title: string, done: boolean): Todo | undefined {
    const todo = getTodoByID(id);
    if(!todo){
        return undefined;
    }
    todo.title = title;
    todo.done = done;
    return todo; 
}

export function deleteTodoByID(id: number): boolean {
    const deleteIndex = todos.findIndex(todo => todo.id === id);
    if (deleteIndex === -1) {
        return false;
    }
    todos.splice(deleteIndex, 1); //splice(startIndex, deleteCount = 1) => xóa 1 phần tử tại vị trí startIndex
    return true;
}
