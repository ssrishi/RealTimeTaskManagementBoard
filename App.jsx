import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "../firebase";

const boardColumns = ["todo", "inProgress", "done"];

export default function App() {
  const [taskList, setTaskList] = useState([]);
  const taskRef = collection(db, "tasks");

  // Listen to Firestore updates
  useEffect(() => {
    const unsub = onSnapshot(taskRef, snapshot => {
      const newTasks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTaskList(newTasks);
    });

    return () => unsub();
  }, []);

  // Add a new task
  const addTask = async () => {
    const name = prompt("Enter task name:");
    if (!name) return;

    await addDoc(taskRef, {
      title: name,
      column: "todo",
      position: Date.now()
    });
  };

  // Edit task title
  const editTask = async (task) => {
    const updatedTitle = prompt("Update title:", task.title);
    if (updatedTitle && updatedTitle !== task.title) {
      await updateDoc(doc(db, "tasks", task.id), {
        title: updatedTitle
      });
    }
  };

  // Remove task
  const removeTask = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      await deleteDoc(doc(db, "tasks", id));
    }
  };

  // When a drag ends
  const onDragEnd = async (result) => {
    const { draggableId, source, destination } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    await updateDoc(doc(db, "tasks", draggableId), {
      column: destination.droppableId,
      position: Date.now()
    });
  };

  return (
    <main className="min-h-screen bg-gray-100 py-6 px-4 sm:px-8">
      <section className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Task Management Board</h1>
          <button
            onClick={addTask}
            className="mt-3 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded shadow"
          >
            + Create Task
          </button>
        </header>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {boardColumns.map((colKey) => (
              <Droppable key={colKey} droppableId={colKey}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-white rounded-lg p-4 shadow-md flex flex-col h-full"
                  >
                    <h2 className="text-xl font-semibold mb-4 capitalize text-gray-700">
                      {colKey === "todo"
                        ? "To Do"
                        : colKey === "inProgress"
                        ? "In Progress"
                        : "Done"}
                    </h2>

                    <div className="space-y-3 overflow-auto flex-1">
                      {taskList
                        .filter(item => item.column === colKey)
                        .sort((a, b) => a.position - b.position)
                        .map((task, idx) => (
                          <Draggable key={task.id} draggableId={task.id} index={idx}>
                            {(dragProps, snapshot) => (
                              <div
                                ref={dragProps.innerRef}
                                {...dragProps.draggableProps}
                                {...dragProps.dragHandleProps}
                                className={`bg-gray-50 border p-3 rounded-md shadow-sm flex justify-between items-start ${
                                  snapshot.isDragging ? "bg-blue-50 shadow" : ""
                                }`}
                              >
                                <span className="text-gray-800 flex-1">{task.title}</span>
                                <div className="flex gap-2 text-lg">
                                  <button
                                    onClick={() => editTask(task)}
                                    className="hover:text-blue-500"
                                    title="Edit"
                                  >
                                    ✏️
                                  </button>
                                  <button
                                    onClick={() => removeTask(task.id)}
                                    className="hover:text-red-500"
                                    title="Delete"
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </section>
    </main>
  );
}
