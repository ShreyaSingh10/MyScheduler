
import TaskForm from './components/TaskForm.js';
import Task from './components/Task.js';
import{useEffect, useState} from "react";
import './App.css';


function App() {
  const [tasks, setTasks] = useState([]);
  //adding local storage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);//only runs when 'tasks'changes
  
  const addTask = (taskName) => {
    //console.log("TASK NAME PARENT", taskName);
   // setTasks((prevTasks) => [...prevTasks, {taskName: taskName, done: false }]);
    //SECOND WAY
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, {taskName: taskName, done: false }];
      console.log("UPDATED TASKS INSIDE FUNCTION:", updatedTasks);
      return updatedTasks// Update tasks immutably using the functional form of setState
  });
  //console.log(tasks);// Note: This console log may not reflect the latest state due to async state updates
}

  return (
    <div className='main'>
      <TaskForm addTask ={addTask}/>
      {tasks.map(task => 
        <Task {...task}/>
      )} 
    </div>
  );
}

export default App;
