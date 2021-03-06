import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import {useNavigate} from "react-router-dom";
import './SignIn.css';

const SignIn : React.FC = () => {
    const navigate = useNavigate();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const SignIn=()=>{
        signInWithEmailAndPassword(auth, Email, Password)
        .then((userCredential) => {
        const user = userCredential.user;
        navigate("/mdgfeed");
        
    })
        .catch((error) => {
            console.log(error);
            if (error.toString().slice(0,83) == "FirebaseError: Firebase: The email address is badly formatted. (auth/invalid-email)" ){
                alert("Invalid email id");
            }
            else if (error.toString().slice(0,86) == "FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password)"){
                alert("Password should be of min length 6");
            }
            else if (error.toString().slice(0,108) == "FirebaseError: Firebase: The email address is already in use by another account. (auth/email-already-in-use)"){
                alert("User already exists with same email");
            }
            else { alert("Error has occurred... ");console.log(error);}
        })
    }
    return(
            <div className="main">
            <div className="SignInbox">
                    <p className="txt">SignIn</p>
                <form className="signInForm">
                    
                    <input className="cred" placeholder="Email" type="text" onChange={(e)=>{setEmail(e.target.value)}} />
                    <input className="cred" placeholder="Password"  type="password" onChange={(e)=>{setPassword(e.target.value)}} />
                    <div className="selectInt">
                    </div>
                </form>
                    <button onClick={()=>{SignIn()}} >SignIn</button>
                    <p className="crtAcct" onClick={()=>{
                        navigate("/Signup");
                    }} >Create an Account
                    </p>
            </div>
        </div>
    );
}

export default SignIn;