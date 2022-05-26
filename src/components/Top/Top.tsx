import React from "react";
import {Link} from "react-router-dom";

const head : React.FC = () => {
    return(
        <div>
            <h1>mdgfeed</h1>
            <div>
                <ul>
                    <Link to = "/signin">
                        <li id = "signinbutton">SignIn</li>
                    </Link>
                    <Link to = "/signun">
                        <li id = "signunbutton">SignUp</li>
                    </Link>               
                </ul>
            </div>
        </div>
    );
} 

export default head;