//import React from "react"; // Only when using classes
import { useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useEffect } from 'react';

function App() {
  const [showAddTask,setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const TasksFromServer = await fetchTasks()
      setTasks(TasksFromServer)
    }

    getTasks();
  },[])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    
    return data
  }

// Add a task
  const addTask = (task) => {
    const id = Math.floor(Math.random()*1000)+1;
    const newTask = { ...task,id }
    setTasks([...tasks, newTask])
  }

// Delete a task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE'
    })

    setTasks(tasks.filter((task)=> task.id !== id));
  }

// Toggle reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {...task,reminder:!task.reminder} : task));
  }

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask) } showAdd={showAddTask} />
      { showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />):('No Tasks to show')}
    </div>
  );
}

// class example
// class App extends React.Component{
//   render() {
//     return (
//       <div className="container">
//         <h1>Hello</h1>
//         <Header />
//       </div>
//     );
//   }
// }

export default App;
