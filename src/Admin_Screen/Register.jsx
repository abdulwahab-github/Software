import { Button } from "@mui/material";
import React , { useEffect , useState } from 'react'
import { useLocation , useNavigate } from 'react-router-dom'
import { postfbdata } from '../config/firebasemethods'
import { signUpUser } from '../config/firebasemethods';



function Register() {
    const [model , setModel] =useState([])
    const navigate = useNavigate("")
    const location = useLocation();
  const submit =(e)=>{
    e.preventDefault(e) 
   signUpUser(model).then((res)=>{
  console.log(res)
  navigate("/")
}).catch((err)=>{
  console.log(err)
})
  
 };
  

  return (
    <div>
      <h2 className="c-light " >Registration Form</h2>
        <form >
       <br />
          <div className="row ms-5  ">
            
        <div className="mb-3 col-md-6 col-sm-12   mt-5" >
          <h3 className="c-light" > Name :</h3>
          <input onChange={e => setModel({ ...model, name: e.target.value })} placeholder="Enter Your Name" type="Name" />
        </div>
        
        <div className="mb-3 col-md-6 col-sm-12 mt-5 ">
          <h3 className="c-light">Email :</h3>
          <input onChange={e => setModel({ ...model, email: e.target.value }) } placeholder="Enter Your Email" type="Email" />
        </div>
        </div>
        <div className="row ms-5 m">
        <div className="mb-3 col-md-6 col-sm-12">
          <h3 className="c-light">Pasword :</h3>
          <input onChange={e => setModel({ ...model, password: e.target.value })} placeholder="Enter Your Password" type="Password" />
        </div>
        <div className="mb-3 col-md-6 col-sm-12">
          <h3 className="c-light">Cnic :</h3>
          <input onChange={e => setModel({ ...model, cnic: e.target.value })} placeholder="Enter Your Cnic" type="Cnic" />
        </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-12">
        <div className=" my-5 ms-5 ">
          <select onChange={e => setModel({ ...model, duty: e.target.value })}>
            <option >Select your Duty</option>
            <option>Admin</option>
            <option>Student</option>
            <option>Teacher</option>
           
            
          </select>
</div >
</div>

</div>
        
          <Button variant="contained" onClick={submit} >Submit</Button>
     
      </form>

    </div>
  )
}

export default Register