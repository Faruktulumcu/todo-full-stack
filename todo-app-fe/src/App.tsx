import React from "react";
import "./styles.css";
import TodoList from "./components/TodoList";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function App() {
  return (
    <div className="container">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TodoList />
      </LocalizationProvider>
    </div>
  );
}

export default App;
