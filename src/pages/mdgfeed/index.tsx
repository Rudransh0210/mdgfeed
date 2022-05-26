import React, { useState } from "react";
import { listImage } from "../../constants/urls";
import ApiService from "../../services/apiService";
import Animal from "../../models/animalModel";

const mdgfeed : React.FC = () => {
    const [loading, setLoading] = useState<boolean> (false);
    const [animalList, setAnimalList] = useState<Animal[]>([]);

    let fetchAnimalData: () => void = async () => {
        setLoading(true);
        let data: Animal[] = await ApiService.get(listImage);
        console.log(data);
        setAnimalList(data);
        setLoading(false);
      };
      
    return(
        <div>
        </div>
    )
      
}


export default mdgfeed;