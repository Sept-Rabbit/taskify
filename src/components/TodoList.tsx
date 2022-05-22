import React from "react";
import { Todo } from "../types";
import SingleTodo from "./SingleTodo";
import { useStore } from "../store/store";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="flex flex-col items-center justify-between w-3/4 gap-10 my-8 lg:w-2/3 lg:flex-row">
      <Droppable droppableId="TodoList">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`w-full rounded-sm bg-[#32C3CD] p-2 lg:w-2/3 ${
              snapshot.isDraggingOver ? "dragactive" : ""
            }`}
          >
            <span className="text-xl text-white">Active Tasks</span>
            {todos.map((todo, i) => (
              <SingleTodo
                index={i}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
                key={todo.id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`w-full rounded-sm bg-[#EB6750] p-2 lg:w-2/3 ${
              snapshot.isDraggingOver ? "dragcomplete" : ""
            }`}
          >
            <span className="text-xl text-white">Completed Tasks</span>
            {completedTodos.map((todo, i) => (
              <SingleTodo
                index={i}
                todo={todo}
                todos={completedTodos}
                setTodos={setCompletedTodos}
                key={todo.id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
