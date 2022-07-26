import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import FormTodo from "./components/FormTodo";
import TodoList from "./components/TodoList";
import GlobalStyles from "@mui/material/GlobalStyles";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getAuth, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export type TodoItem = {
  id: string;
  text: string;
  done: boolean;
};

const Todo = () => {
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  const loadTodos = async (user: User): Promise<boolean> => {
    const todos: TodoItem[] = [];
    const q = query(collection(db, "todos"), where("uuid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      todos.push({
        id: doc.id,
        text: doc.data().text,
        done: doc.data().done,
      });
    });
    setTodoList(todos);
    return true;
  };

  useEffect(() => {
    const unSubscription = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      }
      setUser(user!);
      loadTodos(user!);
    });
    return () => {
      unSubscription();
    };
  }, []);

  const addTodo = async (text: string): Promise<boolean> => {
    await addDoc(collection(db, "todos"), {
      uuid: user!.uid,
      text,
      done: false,
    });
    await loadTodos(user!);
    return true;
  };

  const markDone = async (id: string, done: boolean): Promise<boolean> => {
    await updateDoc(doc(db, "todos", id), { done });
    await loadTodos(user!);
    return true;
  };
  const removeTodo = async (id: string): Promise<boolean> => {
    await deleteDoc(doc(db, "todos", id));
    await loadTodos(user!);
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
              <TodoList
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
