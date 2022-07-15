import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useState } from "react";
import Button from "@mui/material/Button";
type FormTodoProps = {
  addTodo: (text: string) => void;
};

const FormTodo: React.FC<FormTodoProps> = ({ addTodo }) => {
  const [text, setText] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.length === 0) return;
    addTodo(text);
    setText("");
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: "8px",
      }}
    >
      <TextField
        variant="standard"
        value={text}
        placeholder="Add a todo"
        onChange={(e) => setText(e.target.value.trim())}
        sx={{
          width: "100%",
        }}
      />
      <Button type="submit" variant="contained">
        add
      </Button>
    </Box>
  );
};
export default FormTodo;
