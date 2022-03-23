//import req from 'express/lib/request';
import React, {useState, useEffect} from 'react';
// import cn from "classnames";
// import { ReactComponent as Hand } from "./hand.svg";

// import "./styles.scss";


const Timeline = () => { 
  const [data, setData] = useState([])
  
  useEffect(()=>{
    fetch("/posts",{
      headers:{
        'Content-Type':'application/json'
      }
    }).then(res=>res.json())
      .then(result=>{
        console.log(result)
      setData(result.posts)
  })}, [])
  
  function likePost(id) {
    // const [likes, setLiked] = useState(null);

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
      console.log(result)
      }).catch(err=>{
        console.log(err)

      // setLiked(result.posts)
    })}

return(
  <div>
    {data.map(item => {
      return (
        <>
      <h5 key="one">{item.user}</h5>
      <h5 key="two">{item.message}</h5>
      <h5 key="three">{item.createdAt}</h5>
      <h5 key="four">{item.comments}</h5>
      <h6>
        likes: {item.likes}
      </h6>
      <i key="five" className="like-button" 
      onClick={()=>{likePost(item._id)}}>
        like
      </i>
      </>
      )
      })}
  </div>
) 
    }

  

export default Timeline;
