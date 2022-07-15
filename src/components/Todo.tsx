import Button from "@mui/material/Button";
import { TodoItem } from "../App";

type TodoProps = {
  todo: TodoItem;
  markDone: (id: string) => void;
  removeTodo: (id: string) => void;
};
const Todo: React.FC<TodoProps> = ({ todo, markDone, removeTodo }) => {
  return (
    <div>
      {todo.done ? <s>todo.text</s> : todo.text}
      <Button onClick={() => markDone(todo.id)}>
        {todo.done ? "redo" : "done"}
      </Button>
      <Button onClick={() => removeTodo(todo.id)}>remove</Button>
    </div>
  );
};
export default Todo;
