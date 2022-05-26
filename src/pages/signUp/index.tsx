import React from "react";
import { useState } from "react";
import Button from "../../components/Button";
import { auth } from "../../constants/firebase";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";

const SignUp : React.FC = () => {
    const navigate = useNavigate();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    function signup(){

        auth.createUserWithEmailAndPassword(Email, Password)
        .then((userCredential: {user : any;}) => {
            var user = userCredential.user;
            console.log(user.uid);
            navigate("/mdgfeed")
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
            else{alert("Error has occurred... Contact Mono");console.log(error);}
        });
    }
    return(
        <div>
            <input 
            id = "signup-email" 
            type = "email" 
            onChange={(event) => {setEmail(event.target.value)}}/>
            <input 
            id = "signup-password" 
            type = "password" 
            onChange={(event) => {setPassword(event.target.value)}}/>
            <Button 
            onClick={() => {signup();}}
            text = "SignUp"/>
        </div>
    )

}

export default SignUp;