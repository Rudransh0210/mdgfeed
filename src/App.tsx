import React from "react";
import SignIn from "./pages/signIn";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignUp from "./pages/signUp";
import MdgFeed from "./pages/mdgfeed";

const App : React.FC = () => {
    return(
        <Router>
            <Routes>
                <Route path = "/" element = {<SignIn/>}/>
                <Route path = "/signup" element = {<SignUp/>}/>
                <Route path = "/mdgfeed" element = {<MdgFeed/>}/>
            </Routes>
        </Router>
    )
}

export default App;