import React, { useState , useEffect } from "react";
import './Mdg.css';
import { listImage } from "../../constants/urls";
import ApiService from "../../services/apiService";
import Animal from "../../models/animalModel";
import { auth, db } from '../../services/firebase';
import { useNavigate } from "react-router-dom";
import {doc, getDoc} from 'firebase/firestore';
import { signOut } from "firebase/auth";
import Username from "../../components/Username";
import Button from "../../components/Button";

const MdgFeed : React.FC = () => {
    const navigate = useNavigate();
    // state should have type mentioned as => useState<string>("");
    const [username,setUsername] = useState("");
    // All the functiones dealing with firebase were supposed to be firebase service folder.
    const user = auth.currentUser;
    async function getUsername(){
        if (user) {
            const docRef = doc(db, "Users", user!.uid);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            setUsername(data!.userName);
    }}
    // Calling getUsername should be inside a UseEffect.
    // We can have function def., but not call inside component def.
    getUsername();
    const [loading, setLoading] = useState<boolean>(false);
    const [animalList, setAnimalList] = useState<Animal[]>([]);

    // Is this type definiton correct ?? (HINT: It's not.)
    // ASSIGNMENT: LEarn ts. and tell me how you will correct this statement below.
    let fetchAnimalData: () => void = async () => {
        setLoading(true);
        let data: Animal[] = await ApiService.get(listImage);
         // remove console.log before pushing to github
        console.log(data);
        // Where are we using this animalList??
        // Our code was supposed to be a reference not a template.
        setAnimalList(data);
        setLoading(false);
    };
    
    useEffect(() => {
        fetchAnimalData();
        return () => {};
    }, []);
    
    return (
        // What is this HTML structure ?? unnecessary div and react.fragments  
        <div className='main'>
        <div className='Header'>
            <>
            <Username username={username}/>
            {/* Make an onClick Handler function, don't directly put logic in the Ui. */}
            <Button text='Sign Out' onClick={() => { signOut(auth).then(() => {
            navigate(-1);
            }).catch((error) => {
            }); } } />
            </>
            {/* Why no error handling, if error is caught. */}
        </div>
        </div>
      );
}


export default MdgFeed;