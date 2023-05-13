import React from 'react'
import EditSharpIcon from '@mui/icons-material/EditSharp';
import { Box, Button , IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';




function Icon(props) {
    const{tb}=props;
  const navigate = useNavigate("")

    const edit=()=>{
        navigate("/Admin-dash/instituteform")
        
      }
  return (
    <div>
        <IconButton onClick={edit}>
            <EditSharpIcon sx={{
        color:"red",
    }}/>
        </IconButton>
    </div>
  )
}

export default Icon