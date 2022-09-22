import {Route, Routes} from "react-router-dom";

import {useSelector} from 'react-redux';

import Login from "./components/login";

import Signup from "./components/signup"

import Landing from "./components/landingpage";

import Userpage from "./components/userpage";

import Trail from "./components/trial";

function App() {
  const {isLoggedIn} = useSelector((state) => state.onlineStatus)
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        {isLoggedIn && <Route path="/home" element={<Landing/>}></Route>}
        {isLoggedIn && <Route path="/user" element={<Userpage/>}></Route>}
        <Route path="/trial" element={<Trail/>}></Route>
      </Routes>
    </>
  );
}

export default App;
