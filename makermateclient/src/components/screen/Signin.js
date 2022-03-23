import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
//import M from 'materialize-css';

//Signup is a component, inside is all the function we need during signup
const Signin = () => {
  const navigation = useNavigate() 
  //use state is a hook that checks for a change in an object and updates with the second element in the array
  //We have set it equal to an empty string to begin with
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  // this is the function that we call when we click submit after entering signup details
  const postdata = () => {
    fetch("/sessions", {
      method:'post',
      //rules about the info we are sending - we're sending json data
      headers:{
        'Content-Type':'application/json'
      },
      //content of our request, needs to be converted to json(JSON.stringify)
      body:JSON.stringify({
        password,
        email
      })
      //below is what we get back, we are converting the response from the fetch request into json
   }).then(res => res.json())
   //we get back data inside the .then() and printing to the console what it looks like
  .then(data=>{
    if(data.message === 'no user found'){
      console.log({error: "no user"})
    } else {
      localStorage.setItem("user",JSON.stringify(data.user))

      console.log('Sign In successful')
      navigation('/timeline')
    }
  })
  }

  return (
    <div>
      <div className="container" 
            style={{
                margin: "30px auto",
                maxWidth: "500px",
                padding: "20px",
                textAlign: "center"
            }}>
     <div className="mycard">
       <div className="card auth-card input-field">
       <h2>Maker Mate</h2>
       <input
       type="text"
       placeholder="email"
       value={email}
       onChange={(e)=>setEmail(e.target.value)}
       />
       <input
       type="password"
       placeholder="password"
       value={password}
       onChange={(e)=>setPassword(e.target.value)}
       />
       <button className="btn waves-effect waves-light #1976d2 blue darken-2"
       onClick={()=>postdata()}
       >
       Sign In
        </button>
        <h5>
          <Link to="/signup">Don't have an account?</Link>
        </h5>
       </div>
      </div>
      </div>
   </div>
  )
}

export default Signin