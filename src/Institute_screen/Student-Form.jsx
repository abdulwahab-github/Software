import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import "../App.css"
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getDatabase, set, ref, onValue, push } from "firebase/database";
import app from "../config/firebaseconfig";
import { postfbdata } from "../config/firebasemethods";

const auth = getAuth(app);
const db = getDatabase(app);

function StudentForm() {
  const [model, setModel] = useState([]);
  const [fbdata, setfbdata] = useState([]);
    const navigate = useNavigate()
  const [tbHead, settbHead] = useState([
    {
      name: "Course Name",
      key: "Coursename",
    },
  ]);

  const getData = () => {
    let refrence = ref(db, "Course");
    onValue(refrence, (dt) => {
      if (dt.exists()) {
        setfbdata(Object.values(dt.val()));
      } else {
        alert("Data Not Found :(");
      }
    });
  };
  useEffect(() => {
    getData();
  }, []);


  const save =(e)=>{
    postfbdata(model , "Students")
    .then((res)=>{
        console.log(res)
          navigate("/institute-dash/student-list" )
                  
  
    }).catch((err)=>{
      alert(err)
    })
    


   };

  return (
    <div>
      <div className="ms-2 mt-3 first  shadow  dark ">
        <h3 className="text-light">Student Form :</h3>

        <br />

        <br />

        <div className="row">
          <div className="col-md-6 col-sm-12">
            <input
              onChange={(e) =>
                setModel({ ...model, StudentName: e.target.value })
              }
              placeholder="Student Name"
            />
          </div>
          <div className="col-md-6 col-sm-12">
            <input
              onChange={(e) =>
                setModel({ ...model, FatherName: e.target.value })
              }
              placeholder="Father Name"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-12 mt-5">
            <input
              onChange={(e) => setModel({ ...model, Contact: e.target.value })}
              placeholder="Contact Number"
            />
          </div>
          <div className="col-md-6 col-sm-12 mt-5">
            <input
              onChange={(e) => setModel({ ...model, Cnic: e.target.value })}
              placeholder="Cnic Number"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-12 mt-5">
            <h5 className="text-light">Last Qualification</h5>
            <select
              onClick={(e) =>
                setModel({ ...model, Qualification: e.target.value })
              }
            >
              <option className="mt-1" value="">
                Select
              </option>
              <hr className="mb-5 mt-2" />
              <option>Grade 5-8</option>
              <hr />
              <option>Matric</option>
              <hr />
              <option>Intermediate</option>
              <hr />
              <option>Undergraduate</option>
              <hr />
              <option>Graduate</option>
              <hr />
              <option>Masters</option>
              <hr />
              <option>PHD</option>
              <hr />
              <option>Other</option>
            </select>
          </div>

          <div className="col-md-6 col-sm-12 mt-5">
            <h5 className="text-light mt-2">Select Your Course</h5>
            <select
              onClick={(e) =>
                setModel({ ...model, CourseName: e.target.value })
              }
            >
              <option value="">Select</option>
              <hr />
              {fbdata.map((x, i) => (
                <option>{x.Coursename} </option>
              ))}
              <hr />
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-12 mt-4">
            <h5 className="text-light">Section :</h5>
            <select
              onClick={(e) => setModel({ ...model, Section: e.target.value })}
            >
              <option>Batch 1</option>
              <option>Batch 2</option>
              <option>Batch 3</option>
              <option>Batch 4</option>
              <option>Batch 5</option>
              <option>Batch 6</option>
              <option>Batch 7</option>
            </select>
          </div>
          <div className="col-md-6 col-sm-12 mt-5">
            <input
              type="email"
              onChange={(e) => setModel({ ...model, Email: e.target.value })}
              placeholder="Email "
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-12 mt-5 ">
            <input
              type="text"
              onChange={(e) => setModel({ ...model, pass: e.target.value })}
              placeholder="Password"
            />
          </div>
          <div className="col-md-6 col-sm-12 mt-4">
            <h5 className="text-light">City :</h5>
            <select
              onClick={(e) => setModel({ ...model, City: e.target.value })}
            >
              <option value="">Select</option>
              <option>Karachi</option>
              <hr />
              <option>Lahore</option>
              <hr />
              <option>Rawalpindi</option>
              <hr />
              <option>Gujrat</option>
              <hr />
              <option>Larkana</option>
              <hr />
              <option>Sukkhar</option>
              <hr />
              <option>Hyderabad</option>
              <hr />
              <option>Pindi</option>
              <hr />
              <option>Other</option>
              <hr />
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-12 mt-5">
            <h4 className="mt-5 text-light">Country :</h4>
            <select
              className="S"
              onClick={(e) => setModel({ ...model, Country: e.target.value })}
            >
              <option value="">Select Country</option>
              <option>Paksitan</option>
              <hr />
              <option>india</option>
              <hr />
              <option>Austrailia</option>
              <hr />
              <option>Afghanistan</option>
              <hr />
              <option>China</option>
              <hr />
              <option>Bangladesh</option>
              <hr />
            </select>
          </div>
          <div className="col-md-6 col-sm-12 mt-5">
            <h4 className="mt-5 text-light">Date of Birth :</h4>
            <input
              type="text"
              onChange={(e) => setModel({ ...model, Birth: e.target.value })}
              placeholder="Date of Birth "
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-sm-12 mt-5 bck ">
            <h5 className="text-dark">Gender</h5>
            <input
              type="radio"
              onChange={(e) => setModel({ ...model, Gender: e.target.value })}
              id="html"
              name="fav_language"
              value="Male"
            />
              <label>Male</label>
          
            <br />
             
            <input
              type="radio"
              onChange={(e) => setModel({ ...model, Gender: e.target.value })}
              id="css"
              name="fav_language"
              value="Female"
            />
              <label>Female</label>
            <br />
          </div>
          <br />
          <div className="col-md-6 col-sm-12 mt-5 ms-5 ">
            <div className="ms-5 mrgin">
            
          <input
              type="text"
              onChange={(e) => setModel({ ...model, Address: e.target.value })}
              placeholder="Address"
            />
            </div>
            
          </div>
        </div>
        <br />
        <br />

        <Button className="mt-5 px-5 p-2 " variant="contained" onClick={(e)=>save(e)}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default StudentForm;
