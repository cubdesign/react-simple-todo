import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import FormTodo from "./components/FormTodo";
import Todo from "./components/Todo";

export type TodoItem = {
  id: string;
  text: string;
  done: boolean;
};

function App() {
  const [todoList, setTodoList] = useState<TodoItem[]>([
    {
      id: uuidv4(),
      text: "デプロイする",
      done: false,
    },
  ]);
  const addTodo = (text: string): void => {
    setTodoList([{ id: uuidv4(), text: text, done: false }, ...todoList]);
  };
  const markDone = (id: string): void => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      })
    );
  };
  const removeTodo = (id: string): void => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <Container>
        <Typography variant="h1">todo</Typography>
        <FormTodo addTodo={addTodo} />
        <div>
          {todoList.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              markDone={markDone}
              removeTodo={removeTodo}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default App;
