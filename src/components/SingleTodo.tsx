import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../types";
import { useStore } from "../store/store";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
}

const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    console.log(todos);
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onSubmit={(e) => handleEdit(e, todo.id)}
          className={`${
            snapshot.isDragging ? "drag" : ""
          } my-3 flex flex-row items-center justify-between rounded-md bg-yellow-400/70 px-3 shadow-lg transition duration-200 hover:scale-105`}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="w-2/5 px-2 mx-2 rounded-sm focus:outline-none"
            />
          ) : todo.isComplete ? (
            <span className="p-2 line-through">{todo.todo}</span>
          ) : (
            <span className="p-2">{todo.todo}</span>
          )}

          <div className="flex flex-row gap-3 p-2">
            <span
              onClick={() => {
                if (!edit && !todo.isComplete) {
                  setEdit(!edit);
                }
              }}
              className="cursor-pointer"
            >
              <AiFillEdit />
            </span>
            <span
              onClick={() => handleDelete(todo.id)}
              className="cursor-pointer"
            >
              <AiFillDelete />
            </span>
            <span
              onClick={() => handleDone(todo.id)}
              className="cursor-pointer"
            >
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
