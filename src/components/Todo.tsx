import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { TodoItem } from "../App";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

type TodoProps = {
  todo: TodoItem;
  markDone: (id: string) => void;
  removeTodo: (id: string) => void;
};
const Todo: React.FC<TodoProps> = ({ todo, markDone, removeTodo }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography variant="body1">
          {todo.done ? <s>todo.text</s> : todo.text}
        </Typography>
      </CardContent>

      <CardActions>
        <Button onClick={() => markDone(todo.id)}>
          {todo.done ? "redo" : "done"}
        </Button>
        <Button onClick={() => removeTodo(todo.id)}>remove</Button>
      </CardActions>
    </Card>
  );
};
export default Todo;
