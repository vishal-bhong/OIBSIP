import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from "../../actions/auth";

import "./login.css";


const Login = () => {
    const [ formData, setFormData ] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(login(formData, navigate));
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
              <div className="col-12 d-flex justify-content-end mb-2 me-4">
                <a className="mt-2 me-1 fw-bold text-decoration-none" href="/">Forgot password ?</a>
              </div>
              <div className="col-12 mt-2" id="loginitem">
                <button className="btn btn-primary mb-4" id="loginbtn" type="submit">Submit</button>
              </div> 
              <div className="col-12 d-flex justify-content-end mb-2 me-4">
                <a className="fw-bold" href="/Signup">Don't have an account.Click here to Sign in</a>
              </div>        
            </div>
          </form>
        </div>
      </>
    )
}

export default Login;