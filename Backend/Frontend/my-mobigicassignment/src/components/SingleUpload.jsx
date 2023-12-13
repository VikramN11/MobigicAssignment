import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import style from "../Style/SingleUpload.module.css";

const SingleUpload = ({_id, filename, code, user, sharedState, handleState}) => {
  const [downloadUrl, setDownloadUrl] = useState('');
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

            axios.get(`/uploadedFiles/${id}`,{
              headers: {
                'Authorization': localStorage.getItem("token"),
              }
            }).then(res=>{
              console.log(res.data['filePath']);
             console.log(res.data['userUploadedFiles'].filename);
            
            const url = res.data['userUploadedFiles'].filename;

            // Open the download link in a new tab
            window.open(url, '_blank');
            setDownloadUrl(url);
            }).catch(err=>{
              console.log(err);
            })


                downloadInProgress = false;
            }
            else{
                alert(`Enterd wrong code, please check and try again`);
            }
        
    }

    const handleDelete = (id)=>{
        
        axios.delete(`/uploadedFiles/delete/${id}`,{
            headers: {
                'Authorization': localStorage.getItem("token"),
            }
        }).then(res=>{
            console.log(res.data);
            handleState(sharedState.filter(obj => obj._id !== id));
        }).catch(err=>{
            console.log(err.message);
        })
    }

  return (
      <div className={style.singleContainer}>
                <h1>{filename}</h1>
                <div>
              <button id='loadid' onClick={()=>handleDownload(filename, code, _id)}><a href={downloadUrl} id="downloadLink" download={downloadUrl}>Download</a></button>
                <button onClick={()=>handleDelete(_id)}>Delete</button>
                </div>      
        </div>
  )
}

export default SingleUpload