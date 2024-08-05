
import TaskForm from './components/TaskForm.js';
import Task from './components/Task.js';
import{useState} from "react";
import './App.css';


function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (taskName) => {
    //console.log("TASK NAME PARENT", taskName);
    setTasks((prevTasks) => [...prevTasks, taskName]);
  //   SECOND WAY
  //   setTasks((prevTasks) => {
  //     const updatedTasks = [...prevTasks, taskName];
  //     console.log("UPDATED TASKS INSIDE FUNCTION:", updatedTasks);
  //     return updatedTasks// Update tasks immutably using the functional form of setState
  // });
  //console.log(tasks);// Note: This console log may not reflect the latest state due to async state updates
}

// const addTask = (taskName) => {
//   console.log("TASK NAME PARENT", taskName);
//   setTasks((prevTasks) => [...prevTasks, taskName]);
// } //THIS WONT UPDATE ARRAY IN REALTIME

  return (
    <div className='main'>
      <TaskForm addTask ={addTask}/>
      <Task/>
     
    </div>
  );
}

export default App;
