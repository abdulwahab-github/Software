import React from "react";
import "../App.css";
import { useState } from "react";
import { loginUser } from "../config/firebasemethods";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Register from "../Admin_Screen/Register";
import { getDatabase, set, ref, onValue, push } from "firebase/database";
import app from "../config/firebaseconfig";
import { getAuth } from "firebase/auth";

export default function LogIn() {
  const [login, setlogin] = useState({});
  const [fbdata, setfbdata] = useState([]);
  const auth = getAuth(app);
  const database = getDatabase(app);

  const navigate = useNavigate();
  let signIn = () => {
    loginUser(login)
      .then((e) => {
        console.log(e);
        let refrence = ref(database, `user/${e}`);
        onValue(refrence, (dt) => {
          if (dt.exists()) {
            setfbdata(dt.val());
            if (fbdata.duty == "Student") {
              navigate("stdash");
            } else if (fbdata.duty == "Admin") {
              navigate("/Admin-dash");
            } else if (fbdata.duty == "Teacher") {
              navigate("tdash");
            } else if (fbdata.Type == "Institute") {
              navigate(`institute-dash/${e}`);
              
            } 
          } else {
            alert("Data Not Found :(");
          }
        });
       
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <>
      <div className="container   ">
        <div className=" row  ">
          <div className="login py-5 px-5  ">
            <h1 className="mb-5 mt  fw-bolder text-light ">
              Log In <br /> <span className="ms-5">Here</span>
            </h1>
            <div className="ms-5 mar ">
              <div className="ms- ">
                <h4 className=" ms-5 text-dark">Email :</h4>
                <div className="ms-5 margin">
                  <input
                    onChange={(e) =>
                      setlogin({ ...login, email: e.target.value })
                    }
                    type=" Email,number "
                    placeholder=" Email"
                  />
                  <br />
                  <h4 className="my-3 text-dark">Password :</h4>
                  <input
                    onChange={(e) =>
                      setlogin({ ...login, password: e.target.value })
                    }
                    type="password"
                    placeholder="  Pasword"
                    required="required"
                    class="mb-3"
                  />
                </div>

                <button
                  onClick={signIn}
                  class="btn ml-5 btn-primary mb-3 ms-5 mt-2 px-5 w-75 "
                >
                  Log in
                </button>
                <br />
              </div>
              <hr className="c-dark" />
              <p>
                <Link className="pad" to="/register">
                  Register
                </Link>{" "}
                Here Your Self
              </p>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}
