import { useState } from "react";
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value.trim())}
      />
      <button type="submit">add</button>
    </form>
  );
};
export default FormTodo;
