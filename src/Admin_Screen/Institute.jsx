import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import app from "../config/firebaseconfig";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { Box, Button } from "@mui/material";
import Register from "./Register";
import Gif from "../components/Gif";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Icon from "../components/Icon";
import { fbDelete } from "../config/firebasemethods";
import { Modal } from "react-bootstrap";
import { getDatabase, set, ref, onValue, push } from "firebase/database";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';

const auth = getAuth(app);
const db = getDatabase(app);

function Institute(props) {
  const { open } = props;

  const navigate = useNavigate("");
  const [model, setModel] = useState([]);
  const [fbdata, setfbdata] = useState([]);
  const [loader, setLoader] = useState(true);
  const [show, setShow] = useState(false);
  const [id, setid] = useState("");
  const handleClose = () => {
    setShow(false);
  };

  const [tbHead, settbHead] = useState([
    {
      name: "Institute Name",
      key: "InstituteName",
    },

    {
      name: "Active / InActive",
      key: "Active",
    },
    {
      name: "Address",
      key: "Address",
    },
    {
      name: "Owner Email",
      key: "email",
    },
    {
      name: "No Of This Campus",
      key: "NoOfCampus",
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
  ]);

  const getData = () => {
    let refrence = ref(db, "posts");
    onValue(refrence, (dt) => {
      if (dt.exists()) {
        setLoader(false);
        //  setShow(false )
        setfbdata(Object.values(dt.val()));
      } else {
        alert("Data Not Found :(");
      }
    });
  };
  
  const edit = (obj) => {
    setModel({ ...obj });
    navigate("/Admin-dash/instituteform", {
      state: obj,
    });
    console.log(obj.id);
  };

  const Fbdelete = (obj) => {
    setid(obj);
    setShow(true);

    // fbDelete("posts" , obj   )
  };

  const listdelete = () => {
    fbDelete("posts", id);    
    setShow(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const add = () => {
    navigate("/Admin-dash/instituteform");
  };

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
      <div className="ms-5 add">
        <Button className="ms-5 mb-5 bg-success dark " onClick={add}>
          <AddIcon /> Add Institute
        </Button>
      </div>
      <table className=" table  table-striped ">
        <thead>
          <tr>
            {tbHead.map((x, i) => (
              <th className=" table-dark" key={i}>
                {x.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loader ? (
            <Box
              sx={{
                marginLeft: "50vh",
                marginTop: "30vh",
              }}
            >
              <Loader />
            </Box>
          ) : (
            fbdata.map((x, i) => (
              <tr className="table striped" key={i}>
                {tbHead.map((ind, i) => (
                  <td key={i}>
                    {ind.displayfeild ? ind.displayfeild(x) : x[ind.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Institute;
