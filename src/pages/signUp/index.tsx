import React from "react";
import './SignUp.css';
import {createUserWithEmailAndPassword } from "firebase/auth";
import {useEffect,  useState } from "react";
import { auth, db } from '../../services/firebase';
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";


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

    const [interests, setInterests] = useState<any>([]);
    var finalInterests: any[] =[];
    const [email,setEmail] =useState("");
    const [username,setUsername] =useState("");
    const [password,setPassword] =useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
          setInterests(interestData);
      }, []);

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
                    {interests.map((interest: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined; isChecked: any; }, index: React.Key | null | undefined) => (
                    <div className="form-check" key={index}>
                        <input
                        type="checkbox"
                        className="form-check-input"
                        name={interest.name as string}
                        checked={interest?.isChecked || false}
                        onChange={handleChange}
                        />
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