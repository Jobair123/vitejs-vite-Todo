import { useState } from "react"
import './Todo.css'

export default function Todolist(){
  const[tasks,settasks] =useState([])
const[task,settask] = useState("")
const [warning,setwarning] =useState(false)

  const addhandle=(ev)=>{
    
  const name   = ev;
  settask(name)
    
  }
  const handleclick=async ()=>{
    if(tasks.includes(task)){
     setwarning(true);
    }
    else{
      const response = await fetch('http://localhost:8000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: task }),
      });
      const newTask = await response.json();
      settasks([...tasks, newTask.name]);
      setwarning(false);
    }
    
  }
  const removehandle=async(index)=>{
    const taskToRemove = tasks[index];
    await fetch(`http://localhost:8000/api/tasks/${taskToRemove.id}`, {
      method: 'DELETE',
    });
    const newTasks = tasks.filter((_, i) => i !== index);
    settasks(newTasks);
    setwarning(false)
    
  }
return(
  <div>
    <h1>TOdo</h1>
    <input className="container" type="text" placeholder="enter task" onChange={(e)=>addhandle(e.target.value)} />
    <button type="submit" onClick={handleclick}>ADD</button>
   {warning && <p style={{color:"red"}}>Task already exists.</p>}
   <ol>
    {
      tasks.map((item,index)=>(
         <h4>
         <li key={index}>{item}
            <button onClick={()=>removehandle(index)}> X</button></li> 
            </h4>
            
         
      ))
    
    }
    </ol>
  </div>
)
}