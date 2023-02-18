import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { debounce, Grid, IconButton, List, ListSubheader } from "@mui/material";
import React, { useEffect, useState } from "react";
import BasicModal from "./Modal";
import SearchComponent from "./Search";
import TodoItem, { ITodo } from "./TodoItem";
import {
  createTodo,
  deleteTodo,
  findByQuery,
  updateTodo,
  updateTodoDoneStatus,
} from "../api";

export enum ModalType {
  ADD,
  EDIT,
}

interface IOperation {
  type: ModalType;
  item: ITodo;
  title: string;
}

const emptyOperation: IOperation = {
  type: ModalType.ADD,
  item: { id: -1, title: "", description: "", dueToDate: null, done: false },
  title: "Add Todo",
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([
    // {id: 1, title: 'Test', description: 'Description of test', done: false},
    // {id: 2, title: 'Other text', description: 'Some other test text', done: true,}
  ]);

  useEffect(() => {
    findByQuery("").then((resp) => {
      setTodos(resp.data);
    });
  }, []);

  const [open, setOpen] = React.useState(false);
  const [operation, setOperation] = useState<IOperation>({ ...emptyOperation });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSaveConfirm = async (todo: ITodo) => {
    if (operation.type === ModalType.ADD) {
      const { data } = await createTodo(todo);
      setTodos([data].concat(...todos));
    } else {
      const { data } = await updateTodo(todo);
      const clonedTodos = [...todos];
      clonedTodos[clonedTodos.findIndex((t) => t.id === data.id)] = { ...data };
      setTodos([...clonedTodos]);
    }
    handleClose();
  };

  const showModal = (todo?: ITodo) => {
    if (todo != null) {
      setOperation({
        type: ModalType.EDIT,
        title: "Edit Todo",
        item: { ...todo },
      });
    } else {
      setOperation({ ...emptyOperation });
    }
    handleOpen();
  };

  const onDeleteClick = (todo: ITodo) => {
    const clonedTodos = [...todos];
    clonedTodos[clonedTodos.indexOf(todo)] = { ...todo, needConfirm: true };
    setTodos([...clonedTodos]);
  };

  const onDeleteConfirmClick = async (todo: ITodo) => {
    const clonedTodos = [...todos];
    await deleteTodo(todo);
    setTodos([...clonedTodos.filter((t) => t.id !== todo.id)]);
  };

  const onDeleteRejectClick = (todo: ITodo) => {
    const clonedTodos = [...todos];
    clonedTodos[clonedTodos.indexOf(todo)] = { ...todo, needConfirm: false };
    setTodos([...clonedTodos]);
  };

  const debouncedHandleInputChange = debounce(async (value) => {
    const { data } = await findByQuery(value);
    setTodos(data);
  }, 500);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    debouncedHandleInputChange(value);
  };

  const changeDoneStatus = async (todo: ITodo) => {
    await updateTodoDoneStatus(todo.id, !todo.done);
    // const clonedTodos = [...todos];
    // clonedTodos[clonedTodos.findIndex((t) => t.id === todo.id)] = {
    //   ...todo,
    //   done: !todo.done,
    // };
    // setTodos([...clonedTodos]);
    const searchBox = document.getElementById("search-box") as HTMLInputElement;
    findByQuery(searchBox && searchBox.value ? searchBox.value : "").then(
      (resp) => {
        setTodos(resp.data);
      }
    );
  };

  return (
    <Grid container p={2}>
      <List
        sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <SearchComponent onChange={handleInputChange} />
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  onClick={() => showModal(undefined)}
                  sx={{ marginTop: "5px" }}
                >
                  <PlaylistAddIcon fontSize="large" color="primary" />
                </IconButton>
              </Grid>
            </Grid>
          </ListSubheader>
        }
      >
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            item={todo}
            onEditClick={() => showModal(todo)}
            onDeleteClick={() => onDeleteClick(todo)}
            onDeleteConfirmClick={() => onDeleteConfirmClick(todo)}
            onDeleteRejectClick={() => onDeleteRejectClick(todo)}
            changeDoneStatus={() => changeDoneStatus(todo)}
          />
        ))}
      </List>
      {open && (
        <BasicModal
          open={open}
          item={operation.item}
          title={operation.title}
          onConfirm={onSaveConfirm}
          handleClose={handleClose}
        />
      )}
    </Grid>
  );
};

export default TodoList;
