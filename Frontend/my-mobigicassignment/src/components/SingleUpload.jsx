import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const SingleUpload = ({_id, filename, code, user}) => {
    const navigate = useNavigate();

    const handleDownload = (filename, code)=>{
        const entered_code = prompt(`Enter six digit code to download`);

        if(entered_code != null && entered_code == code){
            //make an anchor element
            const btn = document.createElement('a');
            btn.style.display = 'none';
            document.getElementById('loadid').appendChild(btn);

            // Set the download attributes
            btn.href = filename;
            btn.download = filename;

            // Trigger a click event to start the download
            btn.click();

            // Remove the link from the DOM
            document.getElementById('loadid').removeChild(btn);
        }
        else{
            alert(`Enterd wrong code, please check and try again`);
        }
    }

    const handleDelete = (id)=>{
        
        axios.delete(`http://localhost:8080/uploadedFiles/delete/${id}`,{
            headers: {
                'Authorization': localStorage.getItem("token"),
            }
        })
    }

  return (
      <div >
                <h1>{filename}</h1>
                <div>
                    <button id='loadid' onClick={()=>handleDownload(filename, code)}>Download</button>
                    <button onClick={()=>handleDelete(_id)}>Delete</button>
                </div>
        </div>
  )
}

export default SingleUpload