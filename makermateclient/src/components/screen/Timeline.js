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
        console.log(result)
      setData(result.posts)
    })
  }, [])



return(
  <div>
    {data.map(item => {
      return (
      <>
      <h5>{item.user}</h5>
      <h5>{item.message}</h5>
      <h5>{item.createdAt}</h5>
      <h5>{item.comments}</h5>
      </>
      )
      })}
  </div>
)}


export default Timeline