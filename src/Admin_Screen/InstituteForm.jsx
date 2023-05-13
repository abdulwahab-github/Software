import React, { useEffect } from "react";
import "../App.css";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import app from "../config/firebaseconfig";
import { Button } from "@mui/material";
import { EditFbDta, postfbdata } from "../config/firebasemethods";
import Institute from "./Institute";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import { getDatabase, set, ref, onValue, push } from "firebase/database";
import { signUpUser} from '../config/firebasemethods';



function InstituteForm() {
  const auth = getAuth(app);
  const db = getDatabase(app);
  const location = useLocation();
 const [model, setModel] = useState([]);
  const [fbdata, setfbdata] = useState([]);
  const navigate = useNavigate();

  const save = (e) => {
  

    if (model.id) {
      console.log(model.id);
      EditFbDta(model, "posts", model.id)
        .then((res) => {
          navigate("/Admin-dash/institute");
          console.log(res);
         }).catch((err) => {
          console.log(err);
        });}
     else {
      postfbdata(model, "posts")
        .then((res) => {
          navigate("/Admin-dash/institute");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
        
        e.preventDefault(e) 
   signUpUser(model).then((res)=>{
  console.log(res)
 
}).catch((err)=>{
  console.log(err)
})
        
    }
  };
  const back = () => {
    navigate("/Admin-dash/institute");
  };
  const getData = () => {
    let refrence = ref(db, `posts/${location.state}`);
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
      <div className="text-dark mb-5 p-3 rounded shadow d-flex ">
        <div onClick={back}>
          <ArrowBackIcon className="mt-2 c-light back" />
        </div>
        <h3 className="text-dark  mt-1 ms-3">Institute Form :</h3>
      </div>
      
      <div className="ms-2 mt-3 first  shadow  dark ">
      
        <div className="row">
        <div className="text-end">
      <Button className="px-5 22222233 " onClick={save} variant="contained">
          {model.id ? "Edit ":"Save"}
        </Button></div>
          <div className="col-md-6 col-sm-12">
            
            <input
              value={model.InstituteName}
              onChange={e =>
                setModel({ ...model, InstituteName: e.target.value })
              }
              placeholder="Institute Name"
            />
          </div>
          <div className="col-md-6 col-sm-12">
            <input
             value={model.InstituteShortName}
              onChange={e =>
                setModel({ ...model, InstituteShortName: e.target.value })
              }
              placeholder="Institute Short Name"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-12 mt-5">
            <input
            value={model.NoOfCampus}
              onChange={e =>
                setModel({ ...model, NoOfCampus: e.target.value })
              }
              placeholder="No of Campus"
            />
          </div>
          <div className="col-md-6 col-sm-12 mt-5">
            <input
            value={model.CampusDetails}
              onChange={e =>
                setModel({ ...model, CampusDetails: e.target.value })
              }
              placeholder="Campus Details"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-12 mt-5">
            <input
            value={model.CampusLoaction}
              onChange={e =>
                setModel({ ...model, CampusLoaction: e.target.value })
              }
              placeholder="Campus Loaction"
            />
          </div>

          <div className="col-md-6 col-sm-12 mt-5">
            <input
             value={model.Address}
              onChange={e => setModel({ ...model, Address: e.target.value })}
              placeholder="Address"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-12 mt-5">
            <input
             value={model.ContactNo}
              type="text"
              onChange={e =>
                setModel({ ...model, ContactNo: e.target.value })
              }
              placeholder="Contact no"
              maxLength={"11"}
            />
          </div>
          <div className="col-md-6 col-sm-12 mt-5">
            <input
            value={model.OwnerC}
              type="text"
              onChange={e => setModel({ ...model, OwnerC: e.target.value })}
              placeholder="Owner Contact "
              maxLength={"11"}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-12 mt-5 ">
            <input
              type="text"
              
              value={model.email}
              onChange={e => setModel({ ...model, email: e.target.value })}
              placeholder="Owner Email"
            />
          </div>
          <div className="col-md-6 col-sm-12 mt-5 ">
            <input
              type="password"
              
              value={model.password}
              maxLength={"11"}
              onChange={e => setModel({ ...model, password: e.target.value })}
              placeholder="Owner Email Password"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-12 mt-5">
            <h4 className="mt-5">Type :</h4>
            <select
            //  value={model.Type}
              className="S"
              onClick={e => setModel({ ...model, Type: e.target.value })}
            >
              <option value="">Select Place</option>
              <option value="School">School</option>
              <option value="College">College</option>
              <option value="University">University</option>
              <option value="Institute">Institute</option>
            </select>
          </div>
          <div className="col-md-6 col-sm-12 mt-5">
            <h4 className="mt-5">Active / InActive :</h4>
            <select
              className="S"
              // value={model.Active}
              onClick={e => setModel({ ...model, Active: e.target.value })}
            >
              <option>Select Activity</option>
              <option className="opt" >
                Active
              </option>
              <option className="opt2" >
                InActive
              </option>
            </select>
          </div>
        </div>
        <br />

       
      </div>
    </div>
  );
}

export default InstituteForm;
