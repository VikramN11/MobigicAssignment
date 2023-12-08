import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import style from "../Style/SingleUpload.module.css";

const SingleUpload = ({_id, filename, code, user}) => {
    let downloadInProgress = false;
    const navigate = useNavigate();


    const handleDownload = async (filename, code, id)=>{
        if (downloadInProgress) {
            return;  
          }
            const entered_code = prompt(`Enter six digit code to download`);
            console.log(entered_code,code);
            if(entered_code != null && entered_code == code){
                downloadInProgress = true;

                const downloadLink = document.getElementById('downloadLink');

            axios.get(`https://funny-bee-housecoat.cyclic.app/uploadedFiles/${id}`,{
              headers: {
                'Authorization': localStorage.getItem("token"),
              }
            }).then(res=>{
              console.log(res.data['filePath']);
             console.log(res.data['userUploadedFiles'].filename);
              // Enable the download link
            downloadLink.href = res.data['filePath'];
            downloadLink.download = res.data['userUploadedFiles'].filename;
            }).catch(err=>{
              console.log(err);
            })
            //     //make an anchor element
            //     const btn = document.createElement('a');
            //     btn.style.display = 'none';
            //     document.getElementById('loadid').appendChild(btn);
    
            //     // Set the download attributes
            //     btn.href = `.../Backend/uploadedfiles/${filename}`;
            //     btn.download = filename;
    
            //     // Trigger a click event to start the download
            //     btn.click();
    
            //     // Remove the link from the DOM
            //     document.getElementById('loadid').removeChild(btn);


                downloadInProgress = false;
            }
            else{
                alert(`Enterd wrong code, please check and try again`);
            }
        
    }

    const handleDelete = (id)=>{
        
        axios.delete(`https://funny-bee-housecoat.cyclic.app/uploadedFiles/delete/${id}`,{
            headers: {
                'Authorization': localStorage.getItem("token"),
            }
        })
    }

  return (
      <div className={style.singleContainer}>
                <h1>{filename}</h1>
                <div>
                <button id='loadid' onClick={()=>handleDownload(filename, code, _id)}><a href="#" id="downloadLink" download="uploaded_file.txt">Download</a></button>
                <button onClick={()=>handleDelete(_id)}>Delete</button>
                </div>      
        </div>
  )
}

export default SingleUpload