import { useState } from "react";
import { nanoid } from "nanoid";

interface Task {
  id: string;
  title: string;
}

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string) => {
    if (title.length < 1) {
      return;
    }

    const newTask: Task = {
      id: nanoid(),
      title,
    };
    setTasks((prev) => prev.concat(newTask));
  };

  const completeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, taskUpdate: Partial<Task>) => {
    const newTasks = tasks.slice();

    const index = tasks.findIndex((task) => task.id === id);

    newTasks[index] = { ...newTasks[index], ...taskUpdate };

    setTasks(newTasks);
  };

  const filterTasks = (searchKeyword: string) => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  };

  return { tasks, addTask, completeTask, updateTask, filterTasks };
};