import React, { useState } from "react";
import InputField from "../Images/InputField";
import TodoList from "../Images/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import axios from "axios";
import { queryAllByAltText } from "@testing-library/react";

interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

const initialUser = {
  dataCard: "",
};

const Drag = () => {
  const [dataObj, setDataObj] = useState<any>(initialUser);
  const [dataArr, setDataArr] = useState<Array<Todo>>([]);
  const [todo, setTodo] = useState<string>(initialUser.dataCard);
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
      setDataObj({ dataCard: todo });
      setDataArr([...dataArr, dataObj]);
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = CompletedTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };
  // ...post queryText...
  const handlePost = () => {
    axios
      .post("https://localhost:7266/api/CurdOp", dataObj)
      .then((res) => {
        setDataArr(res.data);
      })
      .catch((err) => console.error(err));
  };
  // console.log("////////", dataObj);

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    axios
      .delete(`https://localhost:7266/api/CurdOp/${dataObj.id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((er) => console.error(er));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField
          handlePost={handlePost}
          todo={todo}
          setTodo={setTodo}
          handleAdd={handleAdd}
        />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          CompletedTodos={CompletedTodos}
          setCompletedTodos={setCompletedTodos}
          handleDelete={handleDelete}
        />
      </div>
    </DragDropContext>
  );
};

export default Drag;
