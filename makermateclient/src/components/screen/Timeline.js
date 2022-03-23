//import req from 'express/lib/request';
import React, {useState, useEffect} from 'react';

const Timeline = () => { 
  const [data, setData] = useState([])
  useEffect(()=>{
    fetch("/posts",{
      headers:{
        'Content-Type':'application/json'
      }
    }).then(res=>res.json())
      .then(result=>{
      console.log(result.posts)
      setData(result.posts)
    })
  }, [])



return(
  <div>
    {
      data.map(post=>{
        return(
          <div key={post._id}>
              <h5>{post.message}</h5>
              <img src={post.userImage} alt="photo"/>
              <h4>{post.createdAt}</h4>
              <h3>{post.user}</h3>
              <div>
              {
              post.comments.map(comment=>{
                return(
                  <div key={comment._id}>
                  <h6>{comment.note}</h6>
                  </div>
                )
              })
              }
              </div>
           
          </div>
        )
      })
    }
  </div>
)}


export default Timeline