import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import "./user_signup.css";
import { userSignup } from "../../../actions/userAuth";


const UserSignup = () => {

    const [ signupData, setSignupData ] = useState({ firstName: '', lastName:'', email: '', mobileNo: '', password: '',confirmPassword: '' });
    const [ emailVerificationData, setEmailVerificationData ] = useState({ isVerifying: true, emailForVerification: '', OTP: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setEmailVerificationData({ ...emailVerificationData, isVerifying: false, OTP: '' })
    }, [emailVerificationData.emailForVerification]);


    const handleGetOtp = (e) => {
        e.preventDefault();
        setEmailVerificationData({ ...emailVerificationData, isVerifying: true, OTP: '' });

        axios.post('http://localhost:5000/user/generateOtpForEmail', emailVerificationData)
         .then(res =>{
             toast.success(`OTP sent successfully to ${res.data.result}`);                                    
         })
         .catch((err) => {
             console.log(err.message)            
         });

    }

    const handleOtpSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/user/verifyOtpForEmail', emailVerificationData)
         .then(res =>{
            toast.success(`${res.data.message}`)
            setSignupData({ ...signupData, email: res.data.result })                    
         })
         .catch((err) => {
             toast.error(`${err.response.data.message}`)
         });
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();          
        dispatch(userSignup(signupData, navigate));
    }    
     

    const handleClear = () => {
        setSignupData({ firstName: '', lastName:'', email: '', mobileNo: '', password: '', confirmPassword: '' });
        setEmailVerificationData({ isVerifying: true, emailForVerification: '', OTP: '' });
    }

    return (
        <>
            <form className="flex-column border border-dark" id="register" >            
                <h2 className="fw-bold" id="regtitle">Signup</h2>

                <div className="row mt-4 ms-2" id="fullwidthinput">
                    <div className="col-6">
                    <input type="text" className="form-control form-control-lg" placeholder="first Name" aria-label="first name" value={signupData.firstName} onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })} />               
                    </div>

                    <div className="col-6">
                    <input type="text" className="form-control form-control-lg" placeholder="last Name" aria-label="lastName" value={signupData.lastName} onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })} />               
                    </div>
                </div> 

                <div className="col-12 mt-3 ms-2" id="fullwidthinput">
                <input type="email" className="form-control form-control-lg" placeholder="email" aria-label="email" value={emailVerificationData.emailForVerification} onChange={(e) => setEmailVerificationData({ ...emailVerificationData, emailForVerification: e.target.value })} />               
                </div> 

                {
                    emailVerificationData.emailForVerification ? (
                    <> 
                    {
                        emailVerificationData.isVerifying ?
                        (
                            <>
                             <div className="row ms-2 mt-3" id="fullwidthinput">
                                <input className="form-control" id="emailOtp" onChange={(e) => setEmailVerificationData({ ...emailVerificationData, OTP: e.target.value })}/>
                                <div className="col-3 me-0 ms-auto text-dark">
                                    <button id="resend_otp" onClick={handleGetOtp}>Resend OTP</button>
                                </div>
                                <button className="col-3 me-0 ms-auto fw-semibold bg-success" onClick={handleOtpSubmit}>submit OTP</button>
                             </div>
                            </>
                        ) :
                        (
                            <>
                              <div className="row ms-2 mt-3" id="fullwidthinput">                      
                                <button className="col-3 me-0 ms-auto" onClick={handleGetOtp}>Verify email</button>
                              </div>
                            </>
                        )
                    }                
                    </>
                    ) :   (<></>)
                    
                } 

                <div className="col-12 mt-3 ms-2" id="fullwidthinput">
                <input type="text" className="form-control form-control-lg" placeholder="Mobile No." aria-label="mobile No" value={signupData.mobileNo} onChange={(e) => setSignupData({ ...signupData, mobileNo: e.target.value })} />               
                </div>             

                <div className="col-12 mt-3 ms-2" id="fullwidthinput">
                <input type="password" className="form-control form-control-lg" placeholder="password" aria-label="password" value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password : e.target.value })} />               
                </div> 

                <div className="col-12 mt-3 ms-2" id="fullwidthinput">
                <input type="password" className="form-control form-control-lg" placeholder="confirm password" aria-label="confirm password" value={signupData.confirmPassword} onChange={(e) => setSignupData({ ...signupData, confirmPassword : e.target.value })} />               
                </div> 

                <div className="row gx-5 mt-4 mb-3">

                    <div className="col ms-2">
                    <button className="btn btn-primary" id="regbtn" type="submit" onClick={handleSubmit}>Submit</button>
                    </div>

                    <div className="col me-1">
                    <button className="btn btn-danger" id="regbtn" onClick={handleClear}>Clear</button>
                    </div>
                    
                </div>
                <div className="col-12 d-flex justify-content-end mb-2">
                  <a className="me-3 fw-bold" href="/user/login">Already have an account.Click here to Login</a>
                </div> 
                <div className="col-12 d-flex justify-content-end mb-2">
                  <a className="me-3 fw-bold" href="/admin/signup">Admin Signup ?</a>
                </div>   
            </form>
        </>
    )
}

export default UserSignup;



{/* <input className="form-control" id="emailOtp" /> */}