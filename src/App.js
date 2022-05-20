//import React from "react"; // Only when using classes
import { useState } from "react"
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const [tasks, setTasks] = useState(
    [
        {
            id: 1,
            text: 'Doctor\'s appointment',
            day: 'Feb 5th at 2:30pm',
            reminder: true
        },
        {
            id: 2,
            text: 'Meeting at school',
            day: 'Feb 6th at 1:30pm',
            reminder: true
        },
        {
            id: 3,
            text: 'Food shopping',
            day: 'Feb 5th at 2:30pm',
            reminder: false
        },
    ]
)

// Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task)=> task.id !== id))
  }

// Toggle reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {...task,reminder:!task.reminder} : task))
  }

  return (
    <div className="container">
      <Header />
      <AddTask />
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
