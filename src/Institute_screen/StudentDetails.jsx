import React, { useEffect , useState } from 'react'
import "../App.css"
import { getAuth } from "firebase/auth";
import app from "../config/firebaseconfig";
import { Button , Box } from '@mui/material'
import { useNavigate ,  } from 'react-router-dom'
import { getDatabase, set, ref, onValue, push } from "firebase/database";
import Loader from '../components/Loader';
import { useLocation } from 'react-router-dom';


const auth = getAuth(app);
const db = getDatabase(app);

function StudentDetails() {
  
  const navigate = useNavigate()
  const loaction = useLocation()
  console.log(loaction.state)
  const [loader , setLoader] =useState(true)
  const [fbdata , setfbdata] =useState([])

 
  return (
<>
 <div>
       <h2 className='text-dark'>Student  {loaction.state.StudentName} Details</h2>
       <div className='w-75 detailscss  dark shadow '>
         <h5 className='mt-5 ms-5 text-light text-light table striped ' ><span className="text-danger"> Student Name :</span> {loaction.state.StudentName}</h5>
         <hr />
         <h5 className='mt-2 ms-5 text-light table striped ' ><span className="text-danger"> Student Father Name : </span> {loaction.state.FatherName}</h5>
         <hr />           
         <h5 className='mt-2 ms-5 text-light table striped ' ><span className="text-danger"> Student Contact No : </span>{loaction.state.Contact}</h5>
         <hr />
         <h5 className='mt-2 ms-5 text-light table striped ' ><span className="text-danger"> Student Cnic No : </span> {loaction.state.Cnic}</h5>
         <hr />
         <h5 className='mt-2 ms-5 text-light table striped ' ><span className="text-danger"> Student Last Qualification  : </span>{loaction.state.Qualification}</h5>
         <hr />
         <h5 className='mt-2 ms-5 text-light table striped ' ><span className="text-danger"> Student Course :</span> {loaction.state.CourseName}</h5>
         <hr />
         <h5 className='mt-2 ms-5 text-light table striped ' ><span className="text-danger"> Student Section : </span> {loaction.state.Section}</h5>
         <hr />
         <h5 className='mt-2 ms-5 text-light table striped ' ><span className="text-danger"> Student Email  :</span> {loaction.state.Email}</h5>
         <hr />
         <h5 className='mt-2 ms-5 text-light table striped ' ><span className="text-danger"> Student Password :</span>   {loaction.state.pass}</h5>
         <hr />
         <h5 className='mt-2 ms-5 text-light table striped ' ><span className="text-danger"> Student City  : </span>{loaction.state.City}</h5>
         <hr />
         <h5 className='mt-2 ms-5 text-light table striped ' ><span className="text-danger"> Student Country :</span>  {loaction.state.Country}</h5>
         <hr />
         <h5 className='mt-2 ms-5 text-light table striped ' ><span className="text-danger"> Student Date Of Birth  : </span> {loaction.state.Birth}</h5>
         <hr />
         <h5 className='mt-2 ms-5 text-light table striped ' ><span className="text-danger"> Student Gender :</span> {loaction.state.Gender}</h5>
         <hr />
         <h5 className='mt-2 ms-5 text-light table striped ' ><span className="text-danger"> Student Address </span> : {loaction.state.Address}</h5>
         <hr />

       </div>

  
 </div>




</>
  )
}

export default StudentDetails