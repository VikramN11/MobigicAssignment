import React, { useState } from 'react'
import Upload from './Upload'
import UploadedFiles from './UploadedFiles'

const Userinfo = () => {
const [sharedState, setSharedState] = useState([]);

  const handleState = (val)=>{
     setSharedState(val);
  }
  return (
    <div>
        <UploadedFiles sharedState={sharedState}/>
        <Upload sharedState={sharedState} handleState={handleState}/>
    </div>
  )
}

export default Userinfo