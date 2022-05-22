import type { StoreApi } from "zustand";
import create from "zustand";
import createContext from "zustand/context";
import { persist } from "zustand/middleware";
import { Todo } from "../types";

interface TodoState {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
}

export const useStore = create<TodoState>((set) => ({
  todos: [],
  setTodos: (todos) =>
    set(() => ({
      todos,
    })),
}));
