
import React, {useState, useEffect} from 'react';
import Moment from 'react-moment';


const Timeline = () => { 

  const [posts, setPosts] = useState([])
  const [input, setInput] = useState('')
  const [comment, setComment] = useState("")
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
    })}

    function dislikePost(id) {
      fetch(`/posts/dislike/${id}`,{
        method: 'post',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          _id: id
        })  
      }).then(res=>res.json())
      .then(result=>{
        console.log(result)
        }).catch(err=>{
          console.log(err)
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
  
const makeComment = (note,postId) => {
  fetch(`/posts/${postId}/comment`, {
    method:'post',
    headers:{
      'Content-Type': "application/json"
    },
    body:JSON.stringify({
      note,
      postId: `${postId}`
    })
  }).then(res=>res.json())
    .then(result=>{
    setPosts([result,...posts])
    console.log({message: 'successful comment'})
    }).catch(err=>{
      console.log(err)
  })}

  function deleteData(id) {
    fetch(`/posts/delete/${id}`, {
      method: 'post',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        _id: id
      })
    }).then(response => response.json())
    .then(result => {
      console.log(result)
      const updatedPosts = posts.filter(item =>{
        return item._id !== result._id
      })
      setPosts(updatedPosts)
    }).catch(err => {
      console.log(err)
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
              <div style={{maxWidth :'500px', display:'inline-flex', justifyContent: 'space-evenly'}} className="profile-pic-and-name">
                <img className='profile-pic' style={{maxWidth:'8%'}} src={post.userImage}  alt="it goes here"/>
                <p>{post.user}</p>
                <Moment key={post.createdAt} format="YYYY/MM/DD"><p>{post.createdAt}</p></Moment>
              
              </div >
              <form className='comment-text-area' onSubmit={(e)=>{
                      e.preventDefault();
                      makeComment(e.target[0].value, post._id);
                      e.target[0].value = ""
                    }}>
                <input type="text" placeholder="add a comment"/>
              </form>

       
              <button className="btn waves-effect waves-light #1976d2 blue darken-2"
               onClick={()=>deleteData(post._id)}>
              Delete Your Post
              </button>
              <br></br>
              <img className='profile-pic' style={{maxWidth:'8%'}} src={post.userImage} alt="it goes here"/>
              <h6>likes: {post.likes} </h6>
              <i className="material-icons"
                  onClick={()=>{likePost(post._id)}}
              >thumb_up</i>
                <div>
                 <i  className="dislike-button" 
                  onClick={()=>{dislikePost(post._id)}}>
                  dislike
                </i>
                  {post.comments.map(comment=>{
                    return(
                      <div key={post._id}>
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
