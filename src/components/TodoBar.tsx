import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import { TodoItem } from "../Todo";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";

type TodoBarProps = {
  todo: TodoItem;
  editTodo: (id: string, text: string) => Promise<boolean>;
  markDone: (id: string, done: boolean) => Promise<boolean>;
  removeTodo: (id: string) => Promise<boolean>;
};
const TodoBar: React.FC<TodoBarProps> = ({
  todo,
  editTodo,
  markDone,
  removeTodo,
}) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <CardActions>
        <Checkbox
          onChange={() => markDone(todo.id, !todo.done)}
          checked={todo.done}
        />
      </CardActions>
      <CardContent
        sx={{
          width: "100%",
        }}
        onClick={() => setEditing(!editing)}
      >
        {editing ? (
          <TextField
            variant="standard"
            value={text}
            sx={{
              width: "100%",
            }}
            autoFocus
            onChange={(e) => {
              setText(e.target.value);
            }}
            onClick={(e) => e.stopPropagation()}
            onKeyPress={async (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.nativeEvent.isComposing === false && e.key === "Enter") {
                setEditing(false);
                const trimmedText = text.trim();
                if (trimmedText.length === 0 || todo.text === trimmedText) {
                  setText(todo.text);
                  return;
                }

                setText(trimmedText);
                await editTodo(todo.id, trimmedText);
              }
            }}
            onBlur={async (e: React.FocusEvent<HTMLInputElement>) => {
              console.log("blur");
              setEditing(false);
              const trimmedText = text.trim();
              if (trimmedText.length === 0 || todo.text === trimmedText) {
                setText(todo.text);
                return;
              }
              setText(trimmedText);
              await editTodo(todo.id, trimmedText);
            }}
          />
        ) : (
          <Typography variant="body1">
            {todo.done ? <s>{text}</s> : text}
          </Typography>
        )}
      </CardContent>

      <CardActions>
        <IconButton aria-label="remove" onClick={() => removeTodo(todo.id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default TodoBar;
