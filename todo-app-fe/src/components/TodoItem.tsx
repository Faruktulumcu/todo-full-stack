import { Check, Close, Delete, Edit } from "@mui/icons-material";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { format } from "date-fns";

export interface ITodo {
  id: number;
  title: string;
  description: string;
  dueToDate?: null | Date | string;
  done: boolean;
  needConfirm?: boolean;
}

export interface ITodoItem {
  item: ITodo;
  onEditClick: () => void;
  onDeleteClick: () => void;
  onDeleteConfirmClick: () => void;
  onDeleteRejectClick: () => void;
  changeDoneStatus: () => void;
}

const color = "#80808059";

const TodoItem: React.FC<ITodoItem> = ({
  item,
  onEditClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onDeleteRejectClick,
  changeDoneStatus,
}) => {
  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        textDecoration: item.done ? "line-through" : "none",
        backgroundColor: item.needConfirm ? color : "",
        borderBottom: `1px solid ${color}`,
        ":hover": { backgroundColor: color },
      }}
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={item.done}
          onClick={changeDoneStatus}
          tabIndex={-1}
          disableRipple
          inputProps={{ "aria-labelledby": "1" }}
        />
      </ListItemIcon>
      <ListItemText
        primary={item.title}
        secondary={
          <>
            <Typography
              variant="body2"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }}
            >
              {item.description}
            </Typography>
            <Typography textAlign="end" variant="body2">
              <strong>
                {item.dueToDate &&
                  format(new Date(item.dueToDate), "dd-MM-yyyy HH:mm")}
              </strong>
            </Typography>
          </>
        }
        primaryTypographyProps={{ noWrap: true }}
        secondaryTypographyProps={{
          component: "div",
        }}
      />
      <ListItemIcon>
        {item.needConfirm === true ? (
          <>
            <IconButton onClick={onDeleteConfirmClick}>
              <Check color="success" />
            </IconButton>
            <IconButton onClick={onDeleteRejectClick}>
              <Close />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={onDeleteClick}>
              <Delete color="error" />
            </IconButton>
            <IconButton onClick={onEditClick}>
              <Edit color="primary" />
            </IconButton>
          </>
        )}
      </ListItemIcon>
    </ListItem>
  );
};

export default TodoItem;
