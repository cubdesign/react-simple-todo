import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import { TodoItem } from "../App";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";

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
      <CardActions>
        <Checkbox onChange={() => markDone(todo.id)} checked={todo.done} />
      </CardActions>
      <CardContent
        sx={{
          width: "100%",
        }}
      >
        <Typography variant="body1">
          {todo.done ? <s>{todo.text}</s> : todo.text}
        </Typography>
      </CardContent>

      <CardActions>
        <IconButton aria-label="remove" onClick={() => removeTodo(todo.id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default Todo;
