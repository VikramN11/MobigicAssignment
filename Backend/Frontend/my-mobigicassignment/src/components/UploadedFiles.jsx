import React, { useEffect, useState } from 'react'
import SingleUpload from './SingleUpload';
import axios from 'axios';

const UploadedFiles = ({sharedState, handleState}) => {
    const [uploads, setUploads] = useState([]);

    const getData = ()=>{
        axios.get(`/uploadedFiles/`,{
            headers: {
                'Authorization': localStorage.getItem("token"),
            }
        }).then(res=>{
            console.log(res.data['userUploadedFiles']);
            setUploads(res.data['userUploadedFiles']);
        }).catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        getData();

        return ()=>{
            console.log("cleanup function");
        }
      },[sharedState]);


  return (
    <div>
        {uploads?.map(el=> <SingleUpload key={el._id} {...el} sharedState={sharedState} handleState={handleState} />)}
    </div>
  )
}

export default UploadedFiles