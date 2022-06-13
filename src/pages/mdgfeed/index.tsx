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
    const [username,setUsername] = useState("");
    const user = auth.currentUser;
    async function getUsername(){
        if (user) {
            const docRef = doc(db, "Users", user!.uid);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            setUsername(data!.userName);
    }}
    getUsername();
    const [loading, setLoading] = useState<boolean> (false);
    const [animalList, setAnimalList] = useState<Animal[]>([]);

    let fetchAnimalData: () => void = async () => {
        setLoading(true);
        let data: Animal[] = await ApiService.get(listImage);
        console.log(data);
        setAnimalList(data);
        setLoading(false);
    };
    
    useEffect(() => {
        fetchAnimalData();
        return () => {};
    }, []);
    
    return (
        <div className='main'>
        <div className='Header'>
            <>
            <Username username={username}/>
            <Button text='Sign Out' onClick={() => { signOut(auth).then(() => {
            navigate(-1);
            }).catch((error) => {
            }); } } />
            </>
        </div>
        </div>
      );
}


export default MdgFeed;