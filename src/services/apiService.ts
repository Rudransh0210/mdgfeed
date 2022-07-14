import { Axios, AxiosResponse } from "axios"
import axios from "./axios"

class ApiService {
    
    static get : (url: string)  => Promise<any> = async (url: string) =>  {
        let reponse: AxiosResponse<any> = await axios.get(url);
        return reponse.data;
    }
    // Error handling should be here in ApiService.
}

export default ApiService;