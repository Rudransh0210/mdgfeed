import React from "react";
import SignIn from "./pages/signIn";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignUp from "./pages/signUp";

const App : React.FC = () => {
    return(
        <Router>
            <Routes>
                <Route path = "/signin" element = {<SignIn/>}/>
                <Route path = "/signup" element = {<SignUp/>}/>
            </Routes>
        </Router>
    )
}

export default App;