import { render } from "@testing-library/react";
import React, { useState } from "react";
import Button from "../../components/Button";
import InputField from "../../components/InputField"
import {auth} from "../../constants/firebase";
import {useNavigate} from "react-router-dom"
import { classicNameResolver } from "typescript";

const SignIn : React.FC = () => {
    const navigate = useNavigate();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    function signin(){
        console.log((document.getElementById("email") as HTMLInputElement).value);
        console.log((document.getElementById("password") as HTMLInputElement).value);

        setEmail((document.getElementById("email") as HTMLInputElement).value);
        setPassword((document.getElementById("password") as HTMLInputElement).value);

        auth.signInWithEmailAndPassword(Email , Password)
        .then((userCredential) => {
            console.log(userCredential.user);
            let user = userCredential.user;
            console.log(user?.uid);
            navigate("/mdgfeed")
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
            else { alert("Error has occurred... Contact Mono");console.log(error);}
        })
    }
    return(
            <div>
                <InputField 
                id = "email"
                type = "email"
                label = "Email"/>
                <InputField
                id = "password"
                type = "password"
                label = "Password"/>
                <Button 
                text = "Login"
                onClick={signin}/>
            </div>
        )
}

export default SignIn;