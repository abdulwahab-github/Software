import React from 'react'
import { useState } from 'react'
import Loader from '../components/Loader';
import { Box, Typography } from '@mui/material';

function Registrationcontrol() {
  const [loader , setLoader] =useState(true)
  const [Registrationstatus , setRegistrationstatus] = useState({
    registrationOpen: true,
});
  return loader ?(
    <Typography>Loadimg.....</Typography>
  ):Registrationstatus.registrationOpen?(
    <>
    <Typography>Registration Form</Typography>
    <Box>

    </Box>
    </>
  ) :(
    <Typography>Form is no Longer Available</Typography>
  )
}

export default Registrationcontrol