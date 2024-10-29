import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Box, ListItem, Paper ,Checkbox,List, Typography, IconButton, ButtonGroup, Button} from "@mui/material";
import { deleteTask, toggleComplete } from "../slices/takSlice";
import { DeleteOutline } from "@mui/icons-material";


const TaskList=()=>{
    const tasks=useSelector((state:RootState)=>state.task.tasks);
    const dispatch=useDispatch()
const [filter,setFilter]=useState<'all'|'completed'|'pending'>()
    const filteredTask=tasks.filter(task=>{
        if(filter==='completed')
            return task.completed;
        if(filter==='pending')
            return !task.completed;
        return true
    })


     return(<Box display="flex" justifyContent="center" marginTop="40px">
        <ButtonGroup variant="contained" aria-label="task filter" style={{marginBottom:'16px',marginLeft:'16px',display:'flex',flexDirection:'column'}}><Button onClick={()=>setFilter('all')}>ALL</Button><Button onClick={()=>{setFilter('completed')}}>Completed</Button><Button onClick={()=>{setFilter('pending')}}>Pending</Button></ButtonGroup>
        <Paper sx={{width:'100%',maxwidth:500,mt:2}}>
        <List>
            {filteredTask.map((task)=>(
                <ListItem key={task.id} style={{display:'flex',alignItems:'center'}}>
                    <Box style={{display:'flex',alignItems:'center'}}>
                       <Checkbox checked={task.completed} onChange={()=>dispatch(toggleComplete(task.id))}/>
                        <Typography variant="body1" sx={{textDecoration:task.completed?'line-through':'none'}}>{task.title}</Typography>
                    </Box>
                    <IconButton color="secondary" onClick={()=>{dispatch(deleteTask(task.id))}}>
                    <DeleteOutline/>
                    </IconButton>
                </ListItem>
            )
            )}
        </List>
        </Paper>
     </Box>)
}

export  default TaskList