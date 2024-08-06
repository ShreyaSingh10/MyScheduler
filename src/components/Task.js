import{useState} from "react";
import Checkbox from "./Checkbox";

export default function Task({taskName, done}){

   //const 
    return (
       <div className="task">
         <Checkbox defaultChecked={done}/>
         {taskName}
       </div>

    );
}

