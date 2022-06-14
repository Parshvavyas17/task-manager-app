//import React from "react"; // Only when using classes
import { useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useEffect } from 'react';
import Footer from "./components/Footer";
import About from "./components/About";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskDetails from "./components/TaskDetails";

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

// Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    
    return data
  }

// Add a task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks,data])

    // const id = Math.floor(Math.random()*1000)+1;
    // const newTask = { ...task,id }
    // setTasks([...tasks, newTask])
  }

// Delete a task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE'
    })

    setTasks(tasks.filter((task)=> task.id !== id));
  }

// Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updateTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder
    }

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updateTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? {...task,reminder:data.reminder} : task));
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask) } showAdd={showAddTask} />
        <Routes>
          <Route path="/" element={
            <>
            { showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />):('No Tasks to show')}
          </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
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
