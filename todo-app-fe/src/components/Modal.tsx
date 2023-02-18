import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, IconButton, TextField } from "@mui/material";
import { ITodo } from "./TodoItem";
import { useState } from "react";
import { Close } from "@mui/icons-material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const style = {
  position: "absolute" as const,
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IBasicModal {
  open: boolean;
  title: string;
  handleClose: () => void;
  onConfirm: (todo: ITodo) => void;
  item: ITodo;
}

const BasicModal: React.FC<IBasicModal> = ({
  open,
  handleClose,
  item,
  title,
  onConfirm,
}) => {
  const [todo, setTodo] = useState<ITodo>({ ...item });
  const canBeSubmitted: boolean =
    todo.title.length > 0 &&
    todo.description.length > 0 &&
    todo.dueToDate != null &&
    todo.dueToDate instanceof Date &&
    !isNaN(todo.dueToDate.getDate());
  return (
    <div>
      <Modal open={open} sx={{ top: "20%" }}>
        <Box sx={style}>
          <Grid container>
            <Grid item xs={4} />
            <Grid item xs={4}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {title}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <IconButton onClick={handleClose} sx={{ float: "right" }}>
                <Close />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                value={todo.title}
                onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={todo.description}
                onChange={(e) =>
                  setTodo({ ...todo, description: e.target.value })
                }
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <DateTimePicker
                label="Due to"
                inputFormat="dd-MM-yyyy HH:mm"
                value={todo.dueToDate}
                onChange={(e) => setTodo({ ...todo, dueToDate: e })}
                renderInput={(params) => (
                  <TextField fullWidth {...params} variant="standard" />
                )}
              />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Button
                fullWidth
                disabled={!canBeSubmitted}
                variant="outlined"
                onClick={() => onConfirm(todo)}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
