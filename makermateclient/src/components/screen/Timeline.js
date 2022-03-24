
import React, {useState, useEffect} from 'react';
import Moment from 'react-moment';


const Timeline = () => { 

  const [posts, setPosts] = useState([])
  const [input, setInput] = useState('')
  const user = localStorage.getItem("user")
  
  useEffect(()=>{
    fetch("/posts",{
      headers:{
        'Content-Type':'application/json'
      }
       }).then(response => response.json())
      .then(result => {
      setPosts(result.posts)
    })
  }, [])
  
  function likePost(id) {
    fetch(`/posts/like/${id}`,{
      method: 'post',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        _id: id
      })
    }).then(res=>res.json())
    .then(result=>{
      setPosts(result.posts)
      }).catch(err=>{
        console.log(err)

      // setLiked(result.posts)
    })}
  
  const postData = () => {
    
        fetch("/posts", {
            method: 'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                message: input,
                userImage: user.image
            })
    }).then(response => response.json())
    .then(result =>{
        setPosts([result,...posts])
        console.log('Posted Sucessfully')
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
          <h4>New Post</h4>
         <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  className="materialize-textarea"
                  type="text"
                  placeholder="text here"
                  value={input}
                  onChange={(e)=>setInput(e.target.value)}>
                </textarea>
              </div>
            </div>
          </form>
          <button className="btn waves-effect waves-light #1976d2 blue darken-2"
            onClick={()=>postData()} >
            Post Your Post
          </button>
      </div>
      </div>
    <div>
    <div className="container" 
          style={{
            margin: "10px auto",
            maxWidth: "1000px",
            padding: "20px",
            textAlign: "center"
            }}>
      {posts.map(post=>{
        return(
          <div key={post._id}>
              <h3>{post.message}</h3>
              <Moment key={post.createdAt} format="YYYY/MM/DD">
              <p>{post.createdAt}</p>
              </Moment>
              <div className="profile-pic-and-name">
              <p>{post.user}</p>
              <img id='profile-pic' style={{maxWidth:'20px'}} src={post.userImage}  alt="it goes here"/>
              </div>
              
              <h6>likes: {post.likes} </h6>
              <i key="five" className="like-button" 
                  onClick={()=>{likePost(post._id)}}>
                  like
              </i>
                <div>
                  {post.comments.map(comment=>{
                    return(
                      <div key={comment._id}>
                      <h6>{comment.note}</h6>
                      </div>)
                    })}
                </div>
          </div>
        )
      })
    }
  </div>
  </div>
  </div>

)}


  

export default Timeline;
