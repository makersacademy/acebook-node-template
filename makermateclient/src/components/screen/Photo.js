//import req from 'express/lib/request';
import React, {useState, useEffect} from 'react';

const Photo = () => { 
  const [data, setData] = useState([])
  useEffect(()=>{
    fetch("/photos",{
      headers:{
        'Content-Type':'application/json'
      }
    }).then(res=>res.json())
      .then(result=>{
        console.log(result)
      setData(result.photos)
    })
  }, [])



return(

  <div>
      <div>
        <form action="/photos" enctype="multipart/form-data" method="post">
            <label for="myImage">Add some holiday snaps</label>
            <input class="choose-file-btn" type="file" name="myImage" />
            <input class="upload-btn" type="submit" value="Upload Photo" />
        </form>
        <form action="/photos/profilepic" enctype="multipart/form-data" method="post">
            <label for="myImage">Add profile pic</label>
            <input class="choose-file-btn" type="file" name="myImage" />
            <input class="upload-btn" type="submit" value="Upload Photo" />
        </form>
        
      </div>


    {
      data.map(post=>{
        return(
          <div key={post._id}>
              <h1>{post.imgName}</h1>
              <img src={post.imgPath} alt="photo"/>
          </div>
        )
      })
    }
  </div>
)}


export default Photo