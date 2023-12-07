import { useState } from 'react';
  import axios from "axios";
  import style from "../Style/Signup.module.css";
  import { Link, useNavigate } from 'react-router-dom';
  
  const Signup = ()=>{
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e)=>{
       e.preventDefault();

       if (!username || !password) {
        alert('Please fill in all fields.');
      }else if (password.length < 6) {
        console.log(password);
        alert('Password must be at least 6 characters long.');
      } else {
      try{
        const payload = new FormData();
        payload.append('username', username);
        payload.append('password', password);
  
        await axios.post(`https://funny-bee-housecoat.cyclic.app/users/register`, payload).then(res=>{
          console.log(res.data);
          alert("Registration Successful");
          navigate("/signin")
          setUsername('');
          setPassword('');
         }).catch(err=>{
          console.log(err)});
      }
      catch (error) {
          console.log(error);
        }
    }
  }

    
    return (
      <form className={style.signupContainer} onSubmit={handleSubmit}>
      <h1 style={{fontSize:"larger", fontWeight:"700", color:"#00baf2"}}>Sign Up</h1>
      <input
        type="text"
        name="name"
        placeholder="Please enter your Username"
        value={username}
        onChange={e=>setUsername(e.target.value)}
      />
      
      <input
        type="password"
        name="password"
        placeholder="Please set your Password"
        value={password}
        onChange={e=>setPassword(e.target.value)}
      />
      {/* <input
        type="file"
        name="profile"
        onChange={(e)=>{
          console.log(e.target.files[0]);
          setProfile(e.target.files[0])
        }}
      /><br /> */}
      
      <input type="submit" value="Sign Up" />
      <p>Already Signed up? <Link style={{color:"blue"}} to={"/signin"}>Login</Link></p>
    </form>
    );
  }

  export default Signup;