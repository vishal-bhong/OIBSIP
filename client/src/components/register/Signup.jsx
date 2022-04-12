import React, { useState, useEffect } from "react";
import axios from 'axios';

import "./signup.css";
import { useNavigate } from "react-router-dom";


const Signup = () => {

    const [ signupData, setSignupData ] = useState({ firstName: '', lastName:'', email: '', mobileNo: '', password: '',vconfirmPassword: '' });
    const [ isVerifying, setIsVerifying ] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
       setIsVerifying(false)
    }, [signupData.email]);


    const handleOtpSubmit = () => {
        alert("otp sent successfully ...");
        setIsVerifying(true);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();          
        
        axios.post('http://localhost:5000/user/register', signupData)
        .then(res =>{
            console.log(res);
            console.log(res.data.result.email)
            let result = res.data.result;
            localStorage.setItem('userProfile', JSON.stringify({ result }));           
        navigate('/emailverifier');
        })
        .catch(err => {
            console.log(err)
        });
    }    
     

    const handleClear = () => {
        setSignupData({ firstName: '', lastName:'', email: '', mobileNo: '', password: '', confirmPassword: '' });
    }

    return (
        <>
            <form className="flex-column border border-dark" id="register" onSubmit={handleSubmit} >            
                <h2 className="d-flex fw-bold mt-2" id="regtitle">Signup</h2>

                <div className="row mt-3 ms-2" id="fullwidthinput">
                    <div className="col-6">
                    <input type="text" className="form-control form-control-lg" placeholder="first Name" aria-label="first name" value={signupData.firstName} onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })} />               
                    </div>

                    <div className="col-6">
                    <input type="text" className="form-control form-control-lg" placeholder="last Name" aria-label="lastName" value={signupData.lastName} onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })} />               
                    </div>
                </div> 

                <div className="col-12 mt-3 ms-2" id="fullwidthinput">
                <input type="email" className="form-control form-control-lg" placeholder="email" aria-label="email" value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} />               
                </div> 

                {
                    signupData.email ? (
                    <> 
                    {
                        signupData.email && isVerifying ? 
                        (
                            <>
                             <div className="row ms-2 mt-3" id="fullwidthinput">
                                <input className="form-control" id="emailOtp" />                    
                                <button className="col-3 me-0 ms-auto" onClick={handleOtpSubmit}>submit OTP</button>
                             </div>
                            </>
                        ) :
                        (
                            <>
                              <div className="row ms-2 mt-3" id="fullwidthinput">                      
                                <button className="col-3 me-0 ms-auto" onClick={handleOtpSubmit}>Verify email</button>
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
                    <button className="btn btn-primary" id="regbtn" type="submit">Submit</button>
                    </div>

                    <div className="col me-1">
                    <button className="btn btn-danger" id="regbtn" onClick={handleClear}>Clear</button>
                    </div>
                    
                </div>
                <div className="col-12 d-flex justify-content-end mb-2">
                  <a className="me-3" href="/login">Already have an account.Click here to Login</a>
                </div>            
            </form>
        </>
    )
}

export default Signup;



{/* <input className="form-control" id="emailOtp" /> */}