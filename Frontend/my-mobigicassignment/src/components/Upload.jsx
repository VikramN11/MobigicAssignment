import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
 
    const [file, setFile] = useState();

    const handleUpload = ()=>{
        if (!file) {
         alert('Please choose a file');
       } else {
        const payload = new FormData();
        payload.append('file', file);
         console.log(payload);
   
         axios.post(`http://localhost:8080/uploadedFiles/upload`, payload, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Authorization': localStorage.getItem("token"),
                'Content-Type': 'multipart/form-data',
            },
        }).then(res=>{
           console.log(res.data);
           alert("Uploaded Successfully");
        //    document.getElementById('fileInput').value = null;
          }).catch(err=>{
           console.log(err)});
       }
     }

  return (
    <div>
      <input type="file" id='fileInput' accept=".txt, .pdf, .png, .jpg, .jpeg" onChange={(e)=>setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default Upload