import React from "react";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  return (
    <form className="relative w-4/5 lg:w-2/3" onSubmit={handleAdd}>
      <input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="mx-0.5 w-full rounded-full py-3 px-5 text-xl shadow-sm focus:outline-none lg:text-2xl"
        placeholder="Enter a task"
      />
      <button
        className="input_submit absolute right-3 top-1.5 h-10 w-10 rounded-full bg-[#2f74c0] p-2 text-white shadow-2xl shadow-black/20 transition-transform duration-200 hover:bg-[#388ae2] active:scale-75 lg:top-2"
        type="submit"
      >
        Go
      </button>
    </form>
  );
};

export default InputField;
