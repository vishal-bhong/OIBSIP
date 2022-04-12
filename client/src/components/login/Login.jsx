import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./login.css";


const Login = () => {
    const [ formData, setFormData ] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:5000/user/login', formData )
         .then(res =>{
            let result = res.data.result;
            localStorage.setItem('userProfile', JSON.stringify({ result }));            
           navigate('/home')
         })
         .catch(err => {
             console.log(err)
         })
    }
    

    return (
      <>
        <div id="loginbox">          
          <form className="border border-dark" autoComplete="off" onSubmit={handleSubmit} id="login">        
            <div className="d-flex flex-column align-items-center" >
              <h2 className="fw-bold mt-2" id="logintitle">Log In</h2> 
              <div className="col-12 mt-5" id="loginitem">
                  <input type="email" className="form-control form-control-lg" placeholder="email" aria-label="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div> 
              <div className="col-12 mt-4" id="loginitem" >
                <input type="password" className="form-control form-control-lg" placeholder="password" aria-label="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              </div>
              <div className="col-12 mt-5" id="loginitem">
                <button className="btn btn-primary mb-4" id="loginbtn" type="submit">Submit</button>
              </div> 
              <div className="col-12 d-flex justify-content-end mb-2 me-4">
                <a href="/Signup">don't have an account.Click here to register</a>
              </div>        
            </div>
          </form>
        </div>
      </>
    )
}

export default Login;