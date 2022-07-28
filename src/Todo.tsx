import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import FormTodo from "./components/FormTodo";
import TodoBar from "./components/TodoList";
import GlobalStyles from "@mui/material/GlobalStyles";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useAuthUserContext } from "./providers/AuthUser";

export type TodoItem = {
  id: string;
  text: string;
  done: boolean;
  createdAt: Date;
};

const Todo = () => {
  const db = getFirestore();
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  const { user } = useAuthUserContext();

  const loadTodos = async (): Promise<boolean> => {
    const todos: TodoItem[] = [];
    const q = query(
      collection(db, "todos"),
      where("uuid", "==", user!.uid),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      todos.push({
        id: doc.id,
        text: doc.data().text,
        done: doc.data().done,
        createdAt: (doc.data().createdAt as Timestamp)?.toDate(),
      });
    });
    setTodoList(todos);
    return true;
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = async (text: string): Promise<boolean> => {
    await addDoc(collection(db, "todos"), {
      uuid: user!.uid,
      text,
      done: false,
      createdAt: serverTimestamp(),
    });
    await loadTodos();
    return true;
  };

  const markDone = async (id: string, done: boolean): Promise<boolean> => {
    await updateDoc(doc(db, "todos", id), { done });
    await loadTodos();
    return true;
  };
  const removeTodo = async (id: string): Promise<boolean> => {
    await deleteDoc(doc(db, "todos", id));
    await loadTodos();
    return true;
  };

  return (
    <div>
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: "#fafafa",
          },
        }}
      />
      <Container>
        <Typography variant="h1">todo</Typography>
        <FormTodo addTodo={addTodo} />
        <Stack
          spacing={4}
          sx={{
            marginTop: 2,
          }}
        >
          <Stack spacing={2}>
            {todoList.map((todo) => (
              <TodoBar
                key={todo.id}
                todo={todo}
                markDone={markDone}
                removeTodo={removeTodo}
              />
            ))}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default Todo;
