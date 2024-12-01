"use client";

import { useEffect, useState } from "react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  // Obtener las tareas al cargar la página
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        if (!res.ok) {
          throw new Error("Error al obtener las tareas");
        }
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
      }
    };

    fetchTasks();
  }, []);

  // Crear una nueva tarea
  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({ title: newTask }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Error al crear la tarea");
      }

      const task = await res.json();
      setTasks((prev) => [...prev, task]);
      setNewTask("");
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
  };

  // Actualizar una tarea
  const toggleTask = async (id: string, completed: boolean) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "PUT",
        body: JSON.stringify({ id, completed: !completed }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Error al actualizar la tarea");
      }

      const updatedTask = await res.json();

      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: updatedTask.completed } : task
        )
      );
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  // Eliminar una tarea
  const deleteTask = async (id: string) => {
    await fetch("/api/tasks", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Creador de Tareas</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nueva tarea..."
          className="flex-1 p-2 border rounded text-black"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Añadir
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center justify-between mb-2">
            <span
              onClick={() => toggleTask(task.id, task.completed)}
              className={`flex-1 cursor-pointer ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {task.title}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Borrar
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
