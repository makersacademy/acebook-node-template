import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Posts from "./components/posts.component";
import CreatePosts from "./components/create-posts.component";

function App() {
  return (
    <Router>
      <Route path="/posts" exact component={Posts} />
      <Route path="/posts/new" exact component={CreatePosts} />
    </Router>
  );
}

export default App;
