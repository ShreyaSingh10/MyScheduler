import{useState} from "react";

export default function TaskForm({addTask}){//correct way to recieve function from parent

    const [taskName, setTaskName] = useState();
   

    const handleSubmit= (e) => {

        e.preventDefault();
        console.log("UPDATING");
        if(taskName){
            addTask(taskName);
            setTaskName('');//reinitialise for necxt taskname
        }
       
    }
    return (
        <form onSubmit = {handleSubmit}> 
            <button type="submit">+</button>
            <input type="text" value={taskName} 
            onChange ={e => setTaskName(e.target.value)}
            placeholder="What's on your schedule?"/> 
        </form>
    )
}

