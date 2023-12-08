import React, { useEffect, useState } from 'react'
import SingleUpload from './SingleUpload';
import axios from 'axios';

const UploadedFiles = ({sharedState}) => {
    const [uploads, setUploads] = useState([]);

    const getData = ()=>{
        axios.get(`https://funny-bee-housecoat.cyclic.app/uploadedFiles/`,{
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
        {uploads?.map(el=> <SingleUpload key={el._id} {...el}/>)}
    </div>
  )
}

export default UploadedFiles