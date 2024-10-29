import React, { useEffect } from 'react';
import TaskInput from './components/taskInput';
import TaskList from './components/TaskList';
import { useDispatch } from 'react-redux';
import { addTask, fetchTasks } from './slices/takSlice';
import { title } from 'process';

function App() {

  const dispatch=useDispatch();

  useEffect(()=>{
   const fetchTask= async ()=>{
    const response=await fetch('/tasks.json');
    console.log(response)
    if(response.ok)
    {
      const tasks=await response.json();
    tasks.forEach((task:{id:number,title:string,completed:boolean})=>{
      dispatch(addTask({id:task.id,title:task.title,completed:task.completed}));
    })
    }
   
   }
   fetchTask()
  },[]
)

  return (
    <div className="App">
      <TaskInput/>
      <TaskList/>
    </div>
  );
}

export default App;
