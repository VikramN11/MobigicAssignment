import React from 'react';
import {Routes, Route} from "react-router-dom";
import Signup from './Signup';
import Signin from './Signin';
import Userinfo from './Userinfo';

const AllRoute = () => {
  return (
      <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/userinfo" element={<Userinfo />} />
          {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
  )
}

export default AllRoute