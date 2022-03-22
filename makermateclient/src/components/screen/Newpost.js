import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const NewPost = () => {
    const navigation = useNavigate()
    const [message, setMessage] = useState('')

    const postdata = () => {
        fetch("/post", {
            method: 'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                message: message
            })
    }).then(res => res.json())
    .then(data =>{
        console.log(data)
        console.log('Posted Sucessfully')
        navigation('/timeline')
    })
}

    return (
      
      <div>
      <h1>NewPostPage</h1>
        <div className="row">
         <form className="col s12">
            <div className="row">
             <div className="input-field col s12">
             <textarea
                className="materialize-textarea"
                type="text"
                placeholder="text here"
                value={message}
                onChange={(e)=>setMessage(e.target.value)}>
            </textarea>
        </div>
      </div>
    </form>
    <button className="btn waves-effect waves-light #1976d2 blue darken-2"
        onClick={()=>postdata()}
        >
        Post Your Post
    </button>
  </div>
    </div>
    
    )
  }
  
  export default NewPost




  // value={firstName}
                // onChange={(e)=>setFirstName(e.target.value)}