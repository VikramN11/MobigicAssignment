import { useState } from "react";
import axios from "axios";
import style from "../Style/Signin.module.css";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

  
  const Signin = () =>{
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e)=>{
      e.preventDefault();

      if (!username || !password) {
       alert('Please fill in all fields.');
     } 
     else {
       const payload = {username, password}
 
       axios.post(`https://funny-bee-housecoat.cyclic.app/users/login`, payload).then(res=>{
         console.log(res.data);
         alert("Logged In Successfully");
         localStorage.setItem("token", res.data.token);
         navigate("/userinfo");
         setUsername('');
         setPassword('');
        }).catch(err=>{
          console.log(err);
        })
      }
    }

    return (
      <form className={style.signinContainer} onSubmit={handleSubmit}>
        <h1 style={{fontSize:"larger", fontWeight:"700", color:"#00baf2"}}>Sign In</h1>
      <input
        type="text"
        name="username"
        placeholder="Please enter your Username"
        value={username}
        onChange={e=>setUsername(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Please enter your Password"
        value={password}
        onChange={e=>setPassword(e.target.value)}
      />

      <input type="submit" value="Sign In" />
      <p>New User? <Link style={{color:"blue"}} to={"/"}>SignUp</Link></p>
    </form>
    );
  }

  export default Signin;