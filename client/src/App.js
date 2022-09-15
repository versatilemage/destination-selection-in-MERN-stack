import {Route, Routes} from "react-router-dom";

import Login from "./components/login";

import Signup from "./components/signup"

import Landing from "./components/landingpage";

import Userpage from "./components/userpage";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/home" element={<Landing/>}></Route>
        <Route path="/user" element={<Userpage/>}></Route>
      </Routes>
    </>
  );
}

export default App;
