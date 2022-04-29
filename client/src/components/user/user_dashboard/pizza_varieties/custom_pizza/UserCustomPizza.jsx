import React, { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { io } from "socket.io-client";

import UserNavbar from "../../../userBars/userNavbar/UserNavbar";
import UserSidebar from "../../../userBars/userSidebar/UserSidebar";

import './user_custom_pizza.css';

const UserCustomPizza = () => {
    const [ options, setOptions ] = useState([]);
    const [ customItems, setCustomItems ] = useState({ Pizza_Variety: [], Base: [], Sauce: [], Cheese: [], Veggies: [], name: '', userId: '', email: '', mobileNo: '', amountPaid: '300', type: '', status: 'Pending' });
    const [ selectedBase, setSelectedBase ] = useState([]);
    const [ selectedSauce, setSelectedSauce ] = useState([]);
    const [ selectedCheese, setSelectedCheese ] = useState([]);
    const [ selectedVeggies, setSelectedVeggies ] = useState([]);
    const [ socket, setSocket ] = useState(null);
    
    const user = JSON.parse(localStorage.getItem("userProfile"));

    
    useEffect(() => {
        setSocket(io("http://localhost:5000"));
        setCustomItems({ ...customItems, Base: selectedBase, Sauce: selectedSauce, Cheese: selectedCheese, Veggies: selectedVeggies, name: user?.result?.name, userId: user?.result?._id, email: user?.result?.email, mobileNo: user?.result?.mobileNo });
    },[selectedBase, selectedSauce, selectedCheese, selectedVeggies]);
    
    if(!user) {
        return (
            <>
            <h1 style={{ padding: '100px 0 0 150px', fontWeight: 'bold', color: 'red' }}>Please Log in as user to see the dashboard.. </h1>
            </>
        )
    }    

    // useEffect(() => {
    //     // socket?.emit("newUser", {
    //     //     userName: user.result.email,
    //     //     fullName: user.result.name,
    //     //     mobile: user.result.mobileNo,
    //     //     userId: user.result._id
    //     // });    
    // }, []);

        const handleConfirmAndOrder = async () => {
            await setCustomItems({ ...customItems, type: 'custom_pizza' });
            
            socket.emit("Status", {
                senderUserName : user.result.email,
                receiverUserName : 'powersimmortal@gmail.com',
                status: 'ordered',
            });

            axios.post('http://localhost:5000/inventory/add_order', customItems)
            .then(res =>{ 
                toast.success(`order placed successfully`);                                   
            })
            .catch((err) => {
                console.log(err.message)            
            });

    }

    const HandleAddBaseOption = () => {
        setOptions([]);
        setSelectedBase([]);
        setCustomItems({ ...customItems, type: 'selectedBase' })
        axios.get('http://localhost:5000/inventory/get_bases')
          .then(res => {                
               setOptions(res.data);
            })
          .catch((err) => {
                console.log(err);
            })  
    }

    const HandleAddSauceOption = () => {
        setOptions([]);
        setSelectedSauce([]);
        setCustomItems({ ...customItems, type: 'selectedSauce' })
        axios.get('http://localhost:5000/inventory/get_sauce')
          .then(res => {             
               setOptions(res.data);
            })
          .catch((err) => {
                console.log(err);
            })  
    }
    const HandleAddCheeseOption = () => {
        setOptions([]);
        setSelectedCheese([]);
        setCustomItems({ ...customItems, type: 'selectedCheese' })
        axios.get('http://localhost:5000/inventory/get_cheese')
          .then(res => {             
               setOptions(res.data);
            })
          .catch((err) => {
                console.log(err);
            })  
    }
    const HandleAddVeggiesOption = () => {
        setOptions([]);
        setSelectedVeggies([]);
        setCustomItems({ ...customItems, type: 'selectedVeggies' })
        axios.get('http://localhost:5000/inventory/get_veggies')
          .then(res => {             
               setOptions(res.data);
            })
          .catch((err) => {
                console.log(err);
            })  
    }

    const clearSelected = () => {
        setCustomItems({ Pizza_Variety: [], Base: [], Sauce: [], Cheese: [], Veggies: [], name: '', userId: '', email: '', mobileNo: '', amountPaid: '300', type: '', status: 'Pending' });
        setSelectedBase([]);
        setSelectedSauce([]);
        setSelectedCheese([]);
        setSelectedVeggies([]);
    }

    return (
        <>
            <UserNavbar />
            <UserSidebar />
            <div className="row">
                <div className='col-9' id='custom_pizza_dashboard'>
                     <h1 className="fw-bold text-decoration-underline" id="custom_pizza_title">Customize your pizza here</h1>
                     <form id="custom_pizza_form">
                         <div className="d-flex flex-row">
                            <input type="text" disabled className="form-control from-control-lg" id="custom_pizza_input" value={selectedBase}/>
                            <button className="text-dark fw-bold ms-4" type="button" id="custom_pizza_inputButton" data-bs-toggle="modal" data-bs-target="#OptionModal" onClick={HandleAddBaseOption}>select base</button>
                         </div>
                         <div className="d-flex flex-row my-3">
                            <input type="text" disabled className="form-control from-control-lg" id="custom_pizza_input" value={selectedSauce}/>
                            <button className="text-dark fw-bold ms-4" type="button" id="custom_pizza_inputButton" data-bs-toggle="modal" data-bs-target="#OptionModal" onClick={HandleAddSauceOption}>select sauce</button>
                         </div>
                         <div className="d-flex flex-row">
                            <input type="text" disabled className="form-control from-control-lg" id="custom_pizza_input" value={selectedCheese}/>
                            <button className="text-dark fw-bold ms-4" type="button" id="custom_pizza_inputButton" data-bs-toggle="modal" data-bs-target="#OptionModal" onClick={HandleAddCheeseOption}>select cheese</button>
                         </div>
                         <div className="d-flex flex-row my-3">
                            <input type="text" disabled className="form-control from-control-lg" id="custom_pizza_input" value={selectedVeggies}/>
                            <button className="text-dark fw-bold ms-4" type="button" id="custom_pizza_inputButton" data-bs-toggle="modal" data-bs-target="#OptionModal" onClick={HandleAddVeggiesOption}>select veggies</button>
                         </div>
                         <div className="d-flex flex-row mt-5">                            
                            <button className="text-dark bg-success text-white fw-bold w-25" type="button" onClick={handleConfirmAndOrder}>Confirm and order</button>
                            <button className="text-dark bg-danger text-white fw-bold ms-5 w-25" type="button" onClick={clearSelected}>Clear selected</button>
                         </div>
                     </form>                   
                </div>
            </div>

            <div className="modal" tabIndex="-1" id="OptionModal">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-info fw-bold">Add from the Options</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">                            
                            <div className="row row-cols-2 row-cols-xl-3"> 
                              {
                                options.map((x) => {                                    
                                    const handleAppendOptions = () => {
                                        switch (customItems.type) {
                                            case 'selectedBase':
                                                if (selectedBase.length > 0) return toast.error('cannot add multiple bases');
                                                else {
                                                    setSelectedBase([...selectedBase, x.name]);                                       
                                                    toast.success(`you selected ${x.name}`)                                                                                                       
                                                }
                                                break;

                                            case 'selectedSauce':                                             
                                                setSelectedSauce([...selectedSauce, x.name]);                                                                                            
                                                toast.success(`you selected ${x.name}`)                                                
                                                break;

                                            case 'selectedCheese':                                            
                                                setSelectedCheese([...selectedCheese, x.name]);                                                                                              
                                                toast.success(`you selected ${x.name}`)                                                
                                                break;

                                            case 'selectedVeggies':
                                                setSelectedVeggies([...selectedVeggies, x.name]);                                                                                           
                                                toast.success(`you selected ${x.name}`)                                                
                                                break;
                                        
                                            default:
                                                break;
                                        }
                                    }

                                    return (
                                        <div className="mt-3">
                                                <div className="card" id="user_custom_card" onClick={handleAppendOptions}>               
                                                    <img  alt="this is pizza variety" className="card-img-top" src={x.selectedFile} id="custom_cardimg" />
                                                    <div className="card-body">
                                                        <div className="card-title d-flex flex-column">
                                                            <span className="ms-0 text-info fw-bold">{x.name}</span> 
                                                            <span className="ms-0 text-info fs-7 fw-bold">{`Rs. ${x.cost}`}</span>                               
                                                        </div>
                                                        <div>
                                                            <span id='custom_option_message'>{x.message}</span>
                                                        </div>
                                                    </div>
                                                </div>            
                                        </div>
                                    )
                                })
                              }
                            </div>                             
                        </div>                       
                    </div>
                </div>
            </div>            
        </>
    )
}

export default UserCustomPizza;