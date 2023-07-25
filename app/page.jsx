"use client";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { v4 as uuidv4 } from "uuid";

import { useState, useEffect } from "react";
import { useTheme } from "@wits/next-themes";

import Image from "next/image";
import light from "../public/images/icon-sun.svg";
import dark from "../public/images/icon-moon.svg";
import check from "../public/images/icon-check.svg";
import cross from "../public/images/icon-cross.svg";

const startTodos = [
  {
    id: "item-1",
    content: "Complete entire javaScript course ",
    active: false,
    completed: true,
  },
  {
    id: "item-2",
    content: "Jog around the park 3x",
    active: false,
    completed: false,
  },
  {
    id: "item-3",
    content: "10 minutes meditation",
    active: false,
    completed: false,
  },
  {
    id: "item-4",
    content: "Read for 1 hour",
    active: false,
    completed: false,
  },
  {
    id: "item-5",
    content: "Pick up groceries",
    active: false,
    completed: false,
  },
  {
    id: "item-6",
    content: "Complete Todo App on Frontend Mentor",
    active: false,
    completed: false,
  },
];

//--------------------------------------------
export default function Home() {
  const { theme, setTheme } = useTheme("dark");

  const [hasMounted, setHasMounted] = useState(false);

  const [newTodo, setNewTodo] = useState("");

  // This is the list of ToDos presented in the UI - potentially filtered
  const [todos, setTodos] = useState(startTodos);
  // This is the complete list of ToDos - no filters
  const [backTodos, setBackTodos] = useState(startTodos);

  const [filtering, setFiltering] = useState(false);

  const handleDragEnd = (result) => {
    if (!result.destination) return; // Dropped outside the list

    const updatedItems = Array.from(todos);
    const [removed] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, removed);

    setTodos(updatedItems);
  };

  function reset() {
    setBackTodos(startTodos);
    setTodos(startTodos);
  }

  function toggleTheme() {
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
  }

  function toggleCompleted(todo) {
    const result = todos.map((elm) => {
      if (elm.content === todo.content) {
        return { ...elm, completed: !elm.completed };
      } else return elm;
    });
    setTodos(result);
    setBackTodos(result);
  }

  function activesOnly() {
    if (!filtering) {
      setFiltering(true);
      setBackTodos([...todos]);
    }
    const result = todos.filter((elm) => elm.active);
    setTodos(result);
  }

  function completedOnly() {
    if (!filtering) {
      setFiltering(true);
      setBackTodos([...todos]);
    }
    const result = todos.filter((elm) => elm.completed);
    setTodos(result);
  }

  function allTodos() {
    setFiltering(false);
    setTodos([...backTodos]);
  }

  function remove(todo) {
    // remove todo from the UI list THAT could not be the full list in DB
    const remain = todos.filter((elm) => elm.content !== todo.content);
    setTodos(remain);
    // remove todo from backup list used to restore filters active/completed
    const updtBack = backTodos.filter((elm) => elm.content !== todo.content);
    setBackTodos(updtBack);
  }

  function clearCompleted() {
    const remain = todos.filter((elm) => !elm.completed);
    setBackTodos(remain);
    setTodos(remain);
  }

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };

  function toggleActive(todo) {
    const result = todos.map((elm) => {
      if (elm.content === todo.content) {
        return { ...elm, active: !elm.active };
      } else return elm;
    });
    setTodos(result);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const todoObj = {
      id: uuidv4(),
      content: newTodo,
      active: false,
      completed: false,
    };
    setTodos([...todos, todoObj]);
    setBackTodos([...backTodos, todoObj]);

    setNewTodo("");
  }

  // This did not work to prevent the first load hydration error...
  // I do not know how to fix it.
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <main
      className={`${theme} bg-t-dark_light flex h-full flex-col items-center justify-center w-full`}
    >
      {/* Header image */}
      {theme === "dark" ? (
        <div
          className={`${theme} w-full h-52 bg-bg-mob-d md:bg-bg-dsk-d bg-no-repeat bg-cover`}
        ></div>
      ) : (
        <div
          className={`${theme} w-full h-52 bg-bg-mob-l md:bg-bg-dsk-l bg-no-repeat bg-cover`}
        ></div>
      )}

      {/* wrapper ToDos */}
      <div
        className={`${theme} flex flex-col align-middle justify-center w-11/12 p-2 md:p-0 md:w-1/3 -mt-40`}
      >
        {/* Icon Dark/Light  */}
        <div className="flex align-middle justify-between mb-4">
          <h1
            onClick={reset}
            className="font-bold text-xl md:text-3xl text-white"
          >
            T O D O{" "}
          </h1>
          <Image
            src={theme === "dark" ? light : dark}
            width={10}
            height={10}
            alt="light/dark"
            className="w-5 h-5"
            onClick={toggleTheme}
          />
        </div>

        {/* Input new ToDo */}
        <div
          className={`${theme} flex bg-t-c_blue items-center justify-start mt-3 w-full h-11 rounded-lg mb-5`}
        >
          <div
            className={`${theme} w-9 h-8 ml-2 bg-t-c_blue rounded-full border-2 border-solid border-gray-700`}
          ></div>

          <form onSubmit={handleSubmit} className="w-full">
            <input
              className={`${theme} ml-2 w-11/12 md:w-[95%] bg-t-vg_blue border-none`}
              placeholder="Create a new todo..."
              type="text"
              value={newTodo}
              onChange={handleChange}
            />
          </form>
        </div>

        {/* Wrap ToDos area*/}
        <div className={`${theme} flex flex-col rounded-t-lg bg-t-c_blue`}>
          {/* Each ToDo */}
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="todos">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="w-full m-auto items-center justify-center select-none"
                >
                  {todos.map((todo, index) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          key={index}
                          className="rounded-t-lg border-b border-gray-700"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          style={{
                            ...provided.draggableProps.style,
                          }}
                        >
                          <div
                            className={`${theme} flex h-12 ml-2 mb-2 text-white items-center justify-start`}
                          >
                            {todo.completed ? (
                              <div
                                className="w-9 h-8 rounded-full border-2 border-solid border-gray-700 items-center justify-center 
              bg-gradient-to-r from-t-bg_start to-t-bg_end hover:cursor-pointer"
                                onClick={() => toggleCompleted(todo)}
                              >
                                <Image
                                  src={check}
                                  alt="check"
                                  className=" hover:cursor-pointer ml-2 mt-2 w-3 h-3"
                                />
                              </div>
                            ) : (
                              <div
                                className={`${theme} w-9 h-8 bg-t-c_blue rounded-full border-2 border-solid border-gray-700 hover:cursor-pointer`}
                                onClick={() => toggleCompleted(todo)}
                              ></div>
                            )}
                            <div
                              className={`${theme} ${
                                todo.active
                                  ? "font-bold text-xs md:text-xl"
                                  : "text-xs md:font-normal md:text-base"
                              } w-full h-12 mb-2 mt-2 bg-t-c_blue text-t-dg_blue flex items-center ml-3 rounded-t-lg `}
                            >
                              <p
                                className={`${theme} hover:cursor-crosshair hover:bg-t-hover_blue rounded-lg p-1
                                ${todo.completed ? "line-through" : ""}
                                `}
                                onClick={() => toggleActive(todo)}
                              >
                                {todo.content}
                              </p>
                            </div>
                            {todo.completed ? (
                              <div
                                onClick={() => remove(todo)}
                                className="hover:cursor-pointer rounded-lg"
                              >
                                <Image
                                  src={cross}
                                  alt="delete"
                                  className={`${theme} w-4 h-4 mr-4 rounded-lg`}
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        {/* footer */}
        <div
          className={`${theme} flex flex-col text-t-dg_blue items-center justify-between`}
        >
          <div
            className={`${theme} rounded-b-lg flex items-center justify-between w-full mb-6 bg-t-c_blue p-2`}
          >
            <div className="flex hover:bg-blue-gray-900 p-2 text-xs md:text-sm">
              {todos.reduce((acc, elm) => acc + (elm.completed ? 0 : 1), 0)}
              <p className="ml-1 text-xs md:text-sm">items left</p>
            </div>

            {/* Shows only for desktop */}
            <div className="hidden md:flex p-5 justify-center rounded-lg md:mt-0 space-x-3 text-xs md:text-sm">
              <p
                className="hover:cursor-pointer  hover:text-blue-600"
                onClick={allTodos}
              >
                All
              </p>
              <p
                className="hover:cursor-pointer  hover:text-blue-600"
                onClick={activesOnly}
              >
                Active
              </p>
              <p
                className="hover:cursor-pointer  hover:text-blue-600"
                onClick={completedOnly}
              >
                Completed
              </p>
            </div>
            <div className="mr-2 flex hover:cursor-pointer  hover:text-blue-600">
              <p className="text-xs md:text-sm" onClick={clearCompleted}>
                Clear Completed
              </p>
            </div>
          </div>
          {/* Shows only on mobile */}
          <div
            className={`${theme} bg-t-c_blue flex md:hidden p-4 w-full rounded-lg  justify-center md:mt-0 space-x-3 text-xs`}
          >
            <p
              className="hover:cursor-pointer  hover:text-blue-600"
              onClick={allTodos}
            >
              All
            </p>
            <p
              className="hover:cursor-pointer  hover:text-blue-600"
              onClick={activesOnly}
            >
              Active
            </p>
            <p
              className="hover:cursor-pointer  hover:text-blue-600"
              onClick={completedOnly}
            >
              Completed
            </p>
          </div>
          <p className={`${theme} text-t-dg_blue text-center mt-14`}>
            Drag and Drop to Reorder List
          </p>
        </div>
      </div>
    </main>
  );
}
