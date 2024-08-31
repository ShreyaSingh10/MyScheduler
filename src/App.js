
import TaskForm from './components/TaskForm.js';
import Task from './components/Task.js';
import{useEffect, useState} from "react";
import './App.css';


function App() {
  const [tasks, setTasks] =  useState(() => {
      // Use an initializer function to retrieve from localStorage
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    });
 

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);//only runs when 'tasks'changes

  const addTask = (taskName) => {
    //console.log("TASK NAME PARENT", taskName);
   // setTasks((prevTasks) => [...prevTasks, {taskName: taskName, done: false }]);
    //SECOND WAY
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, {taskName: taskName, done: false }];
      //console.log("UPDATED TASKS INSIDE FUNCTION:", updatedTasks);
      return updatedTasks// Update tasks immutably using the functional form of setState
  });
  //console.log(tasks);// Note: This console log may not reflect the latest state due to async state updates
}

const updateTaskDone = (taskIndex, newDone) => {
  setTasks((prevTasks) => {
    const newTasks = [...prevTasks];
    newTasks[taskIndex].done = newDone;
    return newTasks;
   })
}

const deleteTask = (indexToRemove) => {
  setTasks((prevTasks) => 
    prevTasks.filter((task,index) => index!= indexToRemove ));
}

const numberComplete = tasks.filter(t => t.done).length;
const numberTotal = tasks.length;
const goalAchieved = numberComplete === numberTotal && numberTotal !== 0;
console.log("GOAL", goalAchieved,numberComplete,numberTotal );


  return (
    <div className='main'>
      <div className='heading'> My Magical List </div>
      {goalAchieved? 
        <div className="goal">GOAL ACHIEVED</div>:
        <div className="counter">{numberComplete}/{numberTotal} Complete</div>
      }
      <div className='note'><textarea placeholder='Gratitude Letter to God' type="text"/></div>
      <TaskForm addTask ={addTask}/>
      {tasks.map((task,index) => 
        <Task {...task} 
        key = {index}
        onDelete={() => deleteTask(index)}
        onToggle={done => (updateTaskDone(index,done))} />
      )} 
    </div>
  );
}

export default App;


 //adding local storage

  // Option 2
  // useEffect(() => {
  //   // Load tasks from localStorage when the component mounts
  //   const savedTasks = localStorage.getItem('tasks');
  //   if (savedTasks) {
  //     setTasks(JSON.parse(savedTasks));
  //   }
  // }, []); // Only run on mount