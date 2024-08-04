import{useState} from "react";

export default function TaskForm(){

    const [taskName, setTaskName] = useState();
    return (
        <form>
            <button>+</button>
            <input type="text" value={taskName} 
            onChange ={e => setTaskName(e.target.value)}
            placeholder="What's on your schedule?"/> 
        </form>
    )
}

