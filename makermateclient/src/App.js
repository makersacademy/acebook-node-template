import React from 'react';
import NavBar from './components/NavBar'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/screen/Home'
import Profile from './components/screen/Profile'
import Timeline from './components/screen/Timeline'
import Signin from './components/screen/Signin'
import Signup from './components/screen/Signup'
import NewPost from './components/screen/Newpost'


function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/newpost" element={<NewPost />} />
      </Routes>
</BrowserRouter>
  );
}

export default App;
