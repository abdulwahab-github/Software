import React, { useEffect , useState } from 'react'
import "../App.css"
import { getAuth } from "firebase/auth";
import app from "../config/firebaseconfig";
import { Button , Box } from '@mui/material'
import { useNavigate ,useParams  } from 'react-router-dom'
import { getDatabase, set, ref, onValue, push } from "firebase/database";
import Loader from '../components/Loader';
import { fbDelete } from '../config/firebasemethods';
import { Modal } from "react-bootstrap";


const auth = getAuth(app);
const db = getDatabase(app);

function CourseList() {
const params = useParams();
let {id}= params;
    const navigate = useNavigate()
  const [loader , setLoader] =useState(true)
  const [fbdata , setfbdata] =useState([])
  const [id1, setid] = useState("");
  const [model, setModel] = useState([]);
  const [show, setShow] = useState(false);


    const [tbHead, settbHead] = useState([
        {
          name: "Course Name",
          key: "Coursename"
        },
         
        {
          name: "Duration",
          key: "Duration"
        },{
          name: "Fees Of Course",
          key: "Fees"
        },{
          name: "Teacher Name ",
          key: "TeacherName"
        },
        {
          key: "Edit",
          displayfeild: (e) => (
            <Button className="bg-success text-light" onClick={() => edit(e.id)}>
                Edit
            </Button>
          ),
        },
        {
          key: "delete",
          displayfeild: (e) => (
            <Button className="bg-danger text-light" onClick={() => Fbdelete(e.id)}>
              Delete
            </Button>
          ),
        },
      ])
  const  getData =()=>{
    
    let refrence = ref(db, `Course/${id}`)
    onValue(refrence, (dt) => {
      if (dt.exists()) {
        setLoader(false)
          setfbdata(Object.values(dt.val()));
                } else {
        console.log("Data Not Found :(");
      }
    })
  }
    useEffect(() => {
        getData()
      }, [])

      const edit = (obj) => {
    setModel({ ...obj });
      navigate(`/institute-dash/${id}/courseform`,{
        state: obj,
    });
      };
    
      const Fbdelete = (obj) => {
       setid(obj);
        // console.log(id1)
        setShow(true);
    
       
      };
      const listdelete = () => {
        fbDelete(`Course/${id}`, id1);    
        setShow(false);
      }

      const handleClose = () => {
        setShow(false);
      };



    
    const AddCourse =()=>{
        navigate(`/institute-dash/${id}/courseform`)
    }
  return (
    <div>
      <Modal className="mt-5" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-danger">
          Are You Sure To Delete This
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" className="bg-success text-light" onClick={handleClose}>
            Close
          </Button>
          <Button className="bg-danger text-light" onClick={listdelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
        <div className='add'>
        <Button  className=' mb-5 bg-success dark' onClick={AddCourse}>Add Courses</Button>
            </div>
        <table className=" table  table-striped ">
        <thead>
          <tr>
            {
              tbHead.map((x,i)=> <th className='ms-1 table-dark' key={i}>{x.name}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {loader ? <Box sx={{
        marginLeft:"50vh",
        marginTop:"30vh"
       
     }}>
      <Loader/>

    </Box>  : 
            fbdata.map((x,i)=><tr className="table striped" key={i}>{tbHead.map((ind , i)=>  <td key={i}>
            {ind.displayfeild ? ind.displayfeild(x) : x[ind.key]}
          </td>)}
                   </tr>)
          }
          
        </tbody>
      </table>


    
    </div>
  )
}

export default CourseList