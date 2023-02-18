import axios from "axios";
import { ITodo } from "./components/TodoItem";

const instance = axios.create({
  baseURL: "http://localhost:8090/tasks",
});

export const findByQuery = (q: string) => {
  return instance.get<ITodo[]>(`/search?q=${q}`);
};

export const createTodo = (todo: ITodo) => {
  return instance.post<ITodo>("", todo);
};

export const updateTodo = (todo: ITodo) => {
  return instance.put<ITodo>(`/${todo.id}`, todo);
};

export const updateTodoDoneStatus = (id: number, done: boolean) => {
  return instance.patch<void>(`/${id}/done/${done}`);
};

export const deleteTodo = (todo: ITodo) => {
  return instance.delete<void>(`/${todo.id}`);
};
