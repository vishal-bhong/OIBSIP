import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { toast } from 'react-toastify';

import { userLogin } from "../../../actions/userAuth"
import "./user_login.css";


const UserLogin = () => {

    const [ formData, setFormData ] = useState({ email: '', password: '', forgotPassword: false });
    const [ forgotPassData, setForgotPassData ] = useState({ isVerifying: false, emailForVerification: '', OTP: '', password:'', confirmPassword: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      setForgotPassData({ ...forgotPassData, isVerifying: false, OTP: '' })
  }, [forgotPassData.emailForVerification]);

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(userLogin(formData, navigate));
    }

    const handleForgotPassword = () => {
        setFormData({ ...formData, forgotPassword: true })
    }

    const handleGetOtp = (e) => {
      e.preventDefault();
      setForgotPassData({ ...forgotPassData, isVerifying: true, OTP: '' })
      
      axios.post('http://localhost:5000/user/generateOtpForEmail', forgotPassData)
       .then(res =>{
           toast.success(`OTP sent successfully to ${res.data.result}`);                                    
       })
       .catch((err) => {
           console.log(err.message)            
       });
    }

    const handleOtpSubmit = (e) => {
      e.preventDefault();

      axios.post('http://localhost:5000/user/verifyOtpForEmail', forgotPassData)
       .then(res =>{
          toast.success(`${res.data.message}`)                  
       })
       .catch((err) => {
           toast.error(`${err.response.data.message}`)
       });
    }
    
    const handlePasswordChange = (e) => {
      e.preventDefault();

      axios.post('http://localhost:5000/user/forgotPassword', forgotPassData)
       .then(res =>{ 
          toast.success(`${res.data.message}`)                  
       })
       .catch((err) => {
           toast.error(`${err.response.data.message}`)
       });
    }

    return (
      <>
        <div id="loginbox">   

          {
            !formData.forgotPassword ? 
              (<>
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
                        <a className="mt-2 me-1 fw-bold text-decoration-none" onClick={handleForgotPassword}>Forgot password ?</a>
                      </div>
                      <div className="col-12 mt-2" id="loginitem">
                        <button className="btn btn-primary mb-4" id="loginbtn" type="submit">Submit</button>
                      </div> 
                      <div className="col-12 d-flex justify-content-end mb-2 me-4">
                        <a className="fw-bold" href="/user/signup">Don't have an account.Click here to Sign in</a>
                      </div> 
                      <div className="col-12 d-flex justify-content-end mb-2">
                        <a className="me-3 fw-bold" href="/admin/login">Admin Login ?</a>
                      </div>       
                    </div>
                  </form>
              </>) :

              (<>
                <form className="border border-dark" autoComplete="off" onSubmit={handlePasswordChange} id="login">        
                  <div className="d-flex flex-column align-items-center" >
                    <h2 className="fw-bold mt-2 fs-4" id="logintitle">Verify to Reset Password</h2> 
                    <div className="col-12 mt-5" id="loginitem">
                        <input type="email" className="form-control form-control-lg" placeholder="email" aria-label="email" onChange={(e) => setForgotPassData({ ...forgotPassData, emailForVerification: e.target.value })} />
                    </div> 

                    {
                          forgotPassData.emailForVerification ? (
                          <> 
                          {
                              forgotPassData.isVerifying ?
                              (
                                  <>
                                  <div className="row mt-3" id="loginitem">
                                      <input className="OTPinput form-control mt-2 fs-4" onChange={(e) => setForgotPassData({ ...forgotPassData, OTP: e.target.value })}/>
                                      <div className="col-4 mt-3 me-0 ms-auto ps-4 text-dark">
                                          <button id="resend_otp" onClick={handleGetOtp}>Resend OTP</button>
                                      </div>
                                      <button className="col-3 me-0 ms-auto bg-success" onClick={handleOtpSubmit}>submit OTP</button>
                                  </div>
                                  </>
                              ) :
                              (
                                  <>
                                    <div className="row mt-3" id="loginitem">                      
                                      <button className="col-4 me-0 ms-auto" onClick={handleGetOtp}>Verify email</button>
                                    </div>
                                  </>
                              )
                          }                
                          </>
                          ) :   (<></>)
                          
                      } 

                    <div className="col-12 mt-4" id="loginitem" >
                      <input type="password" className="form-control form-control-lg" placeholder="Password" aria-label="password" onChange={(e) => setForgotPassData({ ...forgotPassData, password: e.target.value })} />
                    </div>
                    <div className="col-12 mt-4" id="loginitem" >
                      <input type="password" className="form-control form-control-lg" placeholder="confirm Password" aria-label="password" onChange={(e) => setForgotPassData({ ...forgotPassData, confirmPassword: e.target.value })} />
                    </div>
                    <div className="col-12 d-flex justify-content-end mb-2 me-4">
                        <a className="mt-2 me-1 fw-bold text-decoration-none" href="/user/login">Go back to Login Page ?</a>
                    </div>
                    <div className="col-12 mt-2" id="loginitem">
                      <button className="btn btn-primary mb-4" id="loginbtn" type="submit">Submit</button>
                    </div> 
                    <div className="col-12 d-flex justify-content-end mb-2 me-4">
                      <a className="fw-bold" href="/user/signup">Don't have an account.Click here to Sign in</a>
                    </div>                    
                  </div>
                </form>
               </>)
          }       
        </div>
      </>
    )
}

export default UserLogin;