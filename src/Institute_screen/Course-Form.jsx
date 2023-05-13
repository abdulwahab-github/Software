import React ,{useState , useEffect , } from 'react'
import { Button } from '@mui/material'
import { EditFbDta, postfbdata } from '../config/firebasemethods'
import { useNavigate , useLocation , useParams  } from 'react-router-dom'
import { getDatabase, set, ref, onValue, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import app from "../config/firebaseconfig";
function CourseForm() {
  const auth = getAuth(app);
  const db = getDatabase(app);
 const [model , setModel] =useState([])
 const [fbdata, setfbdata] = useState([]);
 const params = useParams();
let {id}= params;
 const navigate = useNavigate()
 const location = useLocation();
// console.log(location.state)

 const save =()=>{
  if(location.state){
   EditFbDta(model , `Course` ,location.state )
    .then((res)=>{
        // console.log21(res)
          navigate(`/institute-dash/${id}/courselist`)
  }).catch((err)=>{
      alert(err)
    })
   }else{
    postfbdata(model , `Course/${id}`)
    .then((res)=>{
        // console.log(res)
          navigate(`/institute-dash/${id}/courselist`)
  
  
    }).catch((err)=>{
      alert(err)
    })
   }
   };
   const getData = () => {
    let refrence = ref(db, `Course/${location.state}`);
    onValue(refrence, (dt) => {
      if (dt.exists()) {
        setfbdata(dt.val());
       setModel(dt.val());
       
      } else {
        // alert("Data Not Found :(");
      }
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
    <h2 className="text-dark text-center " >Course Form</h2>
      <form >
       {/* <h2><span className="sucess"> Institute Name:</span> {location.state.InstituteName}</h2> */}
       <br />
        <div className="row ms-5  ">
          
      <div className="mb-3 col-md-6 col-sm-12 mt-2   " >
        <h3 className="text-success"  >Course Name :</h3>
        <input  onChange={e => setModel({ ...model, Coursename: e.target.value })} value={location.state.Coursename} placeholder="Enter Your Course Name" type="Name" />
      </div>
      
      <div className="mb-3 col-md-6 col-sm-12 mt-2  ">
        <h3 className="text-success"> Duration :</h3>
        <input  onChange={e => setModel({ ...model, Duration: e.target.value }) } value={model.Duration} placeholder="Enter Your Duration Months" type="text" />
      </div>
      </div>
      <div className="row ms-5 m">
      <div className="mb-3 col-md-6 col-sm-12 mt-4">
        <h3  className="text-success">Fees of Current Course :</h3>
        <input value={model.Fees} onChange={e => setModel({ ...model, Fees: e.target.value })} placeholder="Enter Your Fees" type="number" />
      </div>
      <div className="mb-3 col-md-6 col-sm-12 mt-4">
        <h3 className="text-success">Teacher Name :</h3>
        <input value={model.TeacherName} onChange={e => setModel({ ...model, TeacherName: e.target.value })} placeholder="Enter Your Teacher Name" type="text" />
      </div>
      </div>
      
      
        <Button variant="contained" className="mt-5 bg-success" onClick={save}  >{location.state ? "Saves Changes" : "Submit" }</Button>
   
    </form>

  </div>
  )
}

export default CourseForm