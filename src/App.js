
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

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
      weekday: 'long', // "Monday"
      year: 'numeric', // "2024"
      month: 'long', // "August"
      day: 'numeric' // "30"
    });
  };
 
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  //const currentDate = getCurrentDate(); As we dont require using setCurrentDate here

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);//only runs when 'tasks'changes

  const addTask = (taskName) => {
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

const updateTaskName = (taskIndex, newTaskName) => {
  setTasks(prevTasks => {
    const newTasks = [...prevTasks];
    newTasks[taskIndex].taskName = newTaskName;
    return newTasks;
  })
}

const deleteList = () => {
  setTasks([]); //deleting all tasks for next day
}
//The deleteAllTasks function clears the tasks by setting the state of tasks to an empty array ([]).
//Since you have a useEffect hook that syncs the state with localStorage, this will also clear the tasks stored in localStorage.

const numberComplete = tasks.filter(t => t.done).length;
const numberTotal = tasks.length;
const goalAchieved = numberComplete === numberTotal && numberTotal !== 0;

  return (
    <div className='main'>
     <div className="date-creator-container">
      <span className='date'>{currentDate}</span> 
      <span className='creator'>Made by Pyaari</span> 
    </div>
      <div className='heading'> My Magical List </div>
      {goalAchieved? 
        <div className="goal">GOAL ACHIEVED</div>:
        <div className="counter">{numberComplete}/{numberTotal} Complete</div>
      }
      <div className='note'><textarea placeholder='Gratitude Letter to God' type="text"/></div>
      {numberTotal !== 0 && <div className="delete" onClick={deleteList}>Delete All</div>}
      <TaskForm addTask ={addTask}/>
      {tasks.map((task,index) => 
        <Task {...task} 
        key = {index}
        onDelete={() => deleteTask(index)}
        onRename={(newName) => updateTaskName(index, newName)}
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