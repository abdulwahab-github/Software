import React from 'react'
import { getAuth } from "firebase/auth";
import app from "../config/firebaseconfig";
import { Button , Box } from '@mui/material'
import { useLocation, useNavigate ,  } from 'react-router-dom'
import { getDatabase, set, ref, onValue, push } from "firebase/database";
import Loader from '../components/Loader';
import { useEffect, useState } from "react";


const auth = getAuth(app);
const db = getDatabase(app);

function StudentList() {
  const [loader , setLoader] =useState(true)
  const [fbdata , setfbdata] =useState([])
  const loaction = useLocation()
  console.log(loaction.state)

    const [tbHead, settbHead] = useState([
        {
          name: "Student  Name",
          key: "StudentName"
        },
         
        {
          name: "Father Name",
          key: "FatherName"
        },{
          name: "Course Name ",
          key: "CourseName"
        },
      ])
     

      const  getData =()=>{
    
        let refrence = ref(db, "Students")
        onValue(refrence, (dt) => {
          if (dt.exists()) {
            setLoader(false)
              setfbdata(Object.values(dt.val()));
              
                 
                    } else {
            alert("Data Not Found :(");
          }
        })}
        useEffect(() => {
            getData()
          }, [])


 
          const gotoDetails= (x)=>{
            navigate("/institute-dash/student-details",{
              state:x,
              
            })
          
          }
const navigate = useNavigate()
const gotoForm = ()=>{
  navigate("/institute-dash/student-form")
}
 
  return (
    <div>
        <div className='add'>
        <Button  className=' mb-5 bg-success dark' onClick={gotoForm} >Add Students</Button>
            </div>
            <table className=" table  table ">
        <thead>
          <tr>
            {
              tbHead.map((x,i)=> <th className='ms-1 table-dark' key={i}>{x.name}</th>)
            }<th className='ms-1 table-dark'> Other Details</th>
          </tr>
        </thead>
        <tbody>
          {loader ? <Box sx={{
        marginLeft:"50vh",
        marginTop:"30vh"
       
     }}>
      <Loader/>

    </Box>  : 
            fbdata.map((x,i)=><tr className="table striped" key={i}>{tbHead.map((ind , i)=> <td  key={i}>{x[ind.key]}  </td>)}
                  <Button variant='text' onClick={()=>gotoDetails(x)}  >details</Button> </tr>)
          }
          
        </tbody>
      </table>




    </div>
  )
}

export default StudentList