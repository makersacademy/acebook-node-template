import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
//import M from 'materialize-css';

//Signup is a component, inside is all the fuction we need during signup
const Signup = () => {
  const navigation = useNavigate() 
  //use state is a hook that checks for a change in an object and updates with the second element in the array
  //We have set it equal to an empty string to begin with
  const [firstName, setFirstName] = useState('') 
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  // this is the function that we call when we click submit after entering signup details
  const postdata = () => {
    fetch("/users", {
      method:'post',
      //rules about the info we are sending - we're sending json data
      headers:{
        'Content-Type':'application/json'
      },
      //content of our request, needs to be converted to json(JSON.stringify)
      body:JSON.stringify({
        firstName, 
        lastName,
        email,
        password
      })
      //below is what we get back, we are converting the response from the fetch request into json
   }).then(res => res.json())
   //we get back data inside the .then() and printing to the console what it looks like
  .then(data=>{
    console.log(data)
    console.log('Sign Up successful')
    navigation('/signin')
  })
  }

  return (
    <div>
     <div className="mycard">
       <div className="card auth-card input-field">
       <h2>Maker Mate</h2>
       <input
       type="text"
       placeholder="first name"
       value={firstName}
       onChange={(e)=>setFirstName(e.target.value)}
       />
       <input
       type="text"
       placeholder="last name"
       value={lastName}
       onChange={(e)=>setLastName(e.target.value)}
       />
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
       Sign Up
        </button>
        <h5>
          <Link to="/signin">Already have an account?</Link>
        </h5>
       </div>
      </div>
   </div>
  )
}

export default Signup