import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, Task } from "../slices/takSlice";

const TaskInput=()=>{
    const [title,setTitle]=useState('')
    const dispatch=useDispatch()

    const handleAddTask=()=>{
        if(title.trim())
        {
            const newTask:Task={
                id:Date.now(),
                completed:false,
                title:title

            }
            dispatch(addTask(newTask))
            setTitle('')
        }
    }
    return (<Box display="flex" justifyContent="center" marginTop="60px">
        <TextField label="New Task" value={title} variant="outlined" onChange={(e)=>{
            setTitle(e.target.value)
        }}/>
        <Button color="primary" onClick={handleAddTask}>Add task</Button>
    </Box>)
}

export default TaskInput