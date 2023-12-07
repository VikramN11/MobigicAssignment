import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {

    const [files, setFiles] = useState(null);

    const handleSubmit = async (e)=>{
        e.preventDefault();
 
        if (!files) {
         alert('Please choose a file');
       } else {
       try{
         const payload = new FormData();
         payload.append('filename', files);
         console.log(payload);
   
         await axios.post(`http://localhost:8080/uploadedFiles/upload`,{
            headers: {
                'Authorization': localStorage.getItem("token"),
            },
            payload
        }).then(res=>{
           console.log(res.data);
           alert("Uploaded Successfully");
           setFiles(null);
          }).catch(err=>{
           console.log(err)});
       }
       catch (error) {
           console.log(error);
           alert('Upload failed. Please try again later.');
         }
     }
   }

  return (
    <form action="/upload" method="post" enctype="multipart/form-data" onSubmit={handleSubmit}>
      <input type="file" name="filename" 
          onChange={(e)=>{
          console.log(e.target.files[0].name);
          setFiles(e.target.files[0].name)
        }} />
      <input type="submit" value="Upload" />
    </form>
  )
}

export default Upload