import React, {useState} from 'react';

const NewPost = () => {
    const [message, setMessage] = useState('')
    const user = localStorage.getItem("user")

    const postdata = () => {
        fetch("/posts", {
            method: 'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                message: message,
                userImage: user.userImage
            })
    }).then(res => res.json())
    .then(data =>{
        console.log('Posted Sucessfully')
    })
}

if(user){
    return (
      <div>
        <div className="container" 
            style={{
                margin: "30px auto",
                maxWidth: "500px",
                padding: "20px",
                textAlign: "center"
            }}>
      <h4>New Post</h4>
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
    </div>
            )
        }
  }
  
  export default NewPost
