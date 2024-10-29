import { Task } from "@mui/icons-material";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  status:'idle'|'loading'|'succeded'|'failed';
  error:string|null;
}

const initialState: TaskState = {
  tasks: [],
  status:'idle',
  error:null
};


export const fetchTasks=createAsyncThunk('task/fetchTasks',async()=>{
  const response=await fetch('/tasks.json');

  if(!response.ok)
    throw new Error('network error')
  else 
    return response.json();
})

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
     
      state.tasks.push(action.payload);
    },
    toggleComplete(state, action: PayloadAction<number>) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    deleteTask(state, action: PayloadAction<number>) {
      const taskIdtodelete=action.payload
      state.tasks = state.tasks.filter((task) => 
        task.id !== taskIdtodelete
      )
    },
  },
});


export const {addTask,deleteTask,toggleComplete}=taskSlice.actions

export default taskSlice.reducer;
