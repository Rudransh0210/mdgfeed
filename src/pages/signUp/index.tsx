import React from "react";
import './SignUp.css';
import {createUserWithEmailAndPassword } from "firebase/auth";
import {useEffect,  useState } from "react";
import { auth, db } from '../../services/firebase';
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

// Put this inside the Constants folder.
// MAke interest a model.
const interestData = [
    { name: "Dance" },
    { name: "Music" },
    { name: "Drama" },
    { name: "Technology" },
    { name: "Singing" },
    { name: "Cars"},
    { name: "Painting"},
    { name: "Calligraphy"}
  ];

const SignUp:React.FC =()=>{
    
    // state should have type mentioned as => useState<string>("");
    // Why use any ???
    const [interests, setInterests] = useState<any>([]);
    var finalInterests: any[] =[];
    const [email,setEmail] =useState("");
    const [username,setUsername] =useState("");
    const [password,setPassword] =useState("");
    const navigate = useNavigate();
    
    // These functions can be much much simpler, easier to implement and straightforward.
    useEffect(() => {
          setInterests(interestData);
      }, []);
      // Make the type a seperate type.
      // Make the interest type already have a isChecked property. 
      const handleChange = (e: { target: { name: any; checked: any; }; }) => {
        const { name, checked } = e.target;
        if (name === "allSelect") {
          let tempInterest = interests.map((interest: any) => {
            return { ...interest, isChecked: checked };
          });
          setInterests(tempInterest);
        } else {
          let tempInterest = interests.map((interest: { name: any; }) =>
            interest.name === name ? { ...interest, isChecked: checked } : interest
          );
          setInterests(tempInterest);
        }
      };

      const SignUp = ()=>{
        createUserWithEmailAndPassword(auth, email, password)
          .then(async(userCredential) => {
            interests.map((_interest: any)=>{
              if (_interest?.isChecked) {
                finalInterests.push(_interest.name);
              }
            });

            var user = userCredential.user;
            await setDoc(doc(db, "Users", user.uid), {
              userName: username,
              email: email,
              interests: finalInterests,
            });

            
            // remove console.log before pushing to github
            console.log(user.uid);
            navigate("/mdgfeed");
          })
        .catch((error : {code : any; message : any;}) => {
            if (error.toString().slice(0,83) == "FirebaseError: Firebase: The email address is badly formatted. (auth/invalid-email)" ){
                alert("Invalid email id");
            }
            else if (error.toString().slice(0,86) == "FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password)"){
                alert("Password should be of min length 6");
            }
            else if (error.toString().slice(0,108) == "FirebaseError: Firebase: The email address is already in use by another account. (auth/email-already-in-use)"){
                alert("User already exists with same email");
            }
            else{alert("Error has occurred... ");console.log(error);}
        });
    }
    return(
      // What is this HTML structure ?? unnecessary div and react.fragments 
      // Why is this  main div in everyfile ? if requried It could have been inside the parent file.
        <div className="main">
            <div className="box">
                    <p className="txt">SignUp</p>
                <form className="signUpForm" action="">
                    <input className="cred" placeholder="Email" type="text" onChange={(e)=>{setEmail(e.target.value)}} />
                    <input className="cred" placeholder="Username" type="text" onChange={(e)=>{setUsername(e.target.value)}}  />
                    <input className="cred" placeholder="Password"  type="password" onChange={(e)=>{setPassword(e.target.value)}} />
                    <div className="selectInt">
                    <input
                    type="checkbox"
                    className="form-check-input"
                    name="allSelect"
                    checked={!interests.some((interest: { isChecked: boolean; }) => interest?.isChecked !== true)}
                    onChange={handleChange}
            />
            <label className="form-check-label ms-2">All Select</label>
            {/* EXCUSE ME....What is this ????? line 108 */}
                    {interests.map((interest: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined; isChecked: any; }, index: React.Key | null | undefined) => (
                    <div className="form-check" key={index}>
                        <input
                        type="checkbox"
                        className="form-check-input"
                        name={interest.name as string}
                        // Why is this null check here, also if something is null, use ?? instead of  || 
                        checked={interest?.isChecked || false}
                        onChange={handleChange}
                        />
                        {/* Where is this ms-2 css class defined? Basically asking have u used bootstrap ?? */}
                        <label className="form-check-label ms-2">{interest.name}</label>
                    </div>))}
                    </div>
                </form>
                    <button onClick={()=>{SignUp()}} >SignUp</button>
                    <p className="haveAccount" onClick={()=>{
                        navigate("/");
                    }}>Have an Account ?
                    </p>
            </div>
        </div>
    )

}

export default SignUp;