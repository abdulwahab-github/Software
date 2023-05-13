import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, set, ref, onValue, push ,update ,child,remove } from "firebase/database";
import app from "./firebaseconfig";

const auth = getAuth(app);
const database = getDatabase(app);


let signUpUser = (obj , node) => {

  return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, obj.email, obj.password)
          .then(res => {
              obj.id = res.user.uid
              const reference = ref(database, `user/${obj.id}`)
              set(reference, obj)

          }).then((res) => {
              resolve(res)
          })
          .catch((err) => reject(err.message))


  });

};



let loginUser = (obj) => {

  return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, obj.email, obj.password)
          .then(res => {
              resolve(res.user.uid)
          }).then(() => resolve(alert("You LogIn Successuly"))
          )
          .catch(err => reject(err.message))
  })
};

let signoutUser = () => {
  return new Promise((resolve, reject) => {
      signOut(auth).then(res => console.log(res))
          .catch(err => console.log(err))
  })

};


let postfbdata = (obj, node , id) => {
if(id){
  return new Promise((resolve, reject) => {
    let objRefre = ref(database, `${node}/${id}`)
    let dataref = ref(database, `${node}`)
    set(objRefre, obj).then((res) => {
        onValue(dataref, (data) => {
            if (data.exists()) {
                resolve(data.val());
            } else {
                console.log("Data Not Found :(");
            }
        })
    }).catch((err) => reject(err.message))

})
}else{
  return new Promise((resolve, reject) => {
    let keyrefr = ref(database, `${node}/`);
    obj.id = push(keyrefr).key;
    let objRefre = ref(database, `${node}/${obj.id}`)
    let dataref = ref(database, `${node}`)
    set(objRefre, obj).then((res) => {
        onValue(dataref, (data) => {
            if (data.exists()) {
                resolve(data.val());
            } else {
                console.log("Data Not Found :(");
            }
        })
    }).catch((err) => reject(err.message))

})
}};
let EditFbDta = (obj, node , id)=>{
  return new Promise((resolve, reject) => {
    let objRefre = ref(database, `${node}/${id}`)
    let dataref = ref(database, `${node}`)
    set(objRefre, obj).then((res) => {
        onValue(dataref, (data) => {
            if (data.exists()) {
                resolve(data.val());
            } else {
                console.log("Data Not Found :(");
            }
        })
    }).catch((err) => reject(err.message))

})
}
let fbDelete = ( node , id) => {
  // return new Promise((resolve, reject) => {
    remove(ref(database , `${node}/${id}`))
    .then(() => {
        // alert("Sucessfully deleted")
    })
    .catch((error) => {
        alert(error)
    })
   


 };

export {
  EditFbDta,
  postfbdata,
  signUpUser,
  loginUser,
  fbDelete,
  
  
};