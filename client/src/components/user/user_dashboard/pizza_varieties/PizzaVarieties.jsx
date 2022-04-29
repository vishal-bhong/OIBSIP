import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PizzaVariety from "./pizza_variety/PizzaVariety";
import './pizza_varieties.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { IoAddCircleOutline } from "react-icons/io5";

const PizzaVarieties = () => {
    const [ pizzaVarieties, setPizzaVarieties ] = useState([]);
    const navigate = useNavigate();
    const [ pizzaOrder, setPizzaOrder ] = useState({ Pizza_Variety: [], Base: [], Sauce: [], Cheese: [], Veggies: [], name: '', userId: '', email: '', mobileNo: '', amountPaid: '300', type: 'pizza_variety', status: 'Pending' });
    const [ selectedPizzaVarieties, setSelectedPizzaVarieties ] = useState([]);

    const user = JSON.parse(localStorage.getItem("userProfile"));

    React.useEffect(() => {
        setPizzaOrder({ ...pizzaOrder, Pizza_Variety: selectedPizzaVarieties, name: user?.result?.name, userId: user?.result?._id, email: user?.result?.email, mobileNo: user?.result?.mobileNo });
    }, [selectedPizzaVarieties]);


    useEffect(() => {
        axios.get('http://localhost:5000/inventory/get_varieties')
         .then(res => {
             setPizzaVarieties(res.data);
            })
            .catch((err) => {
                console.log(err);
            })         
        }, []);

    const handleCustomNavigate = () => {
        navigate("/user/dashboard/custom_pizza")
    }

    const handleConfirmAndOrder = async () => {
        if(window.confirm(`Confirm your order "${pizzaOrder.Pizza_Variety}" ?`) === true) {
            axios.post('http://localhost:5000/inventory/add_order', pizzaOrder)
            .then(res =>{ 
                toast.success(`order placed successfully`);                                   
            })
            .catch((err) => {
                console.log(err);
            })
        } else {
            alert("Request Canceled ...");
        }
      }  

    const handleClear = () => {
        setPizzaOrder({ Pizza_Variety: [], Base: [], Sauce: [], Cheese: [], Veggies: [], name: '', userId: '', email: '', mobileNo: '', amountPaid: '300', type: 'pizza_variety', status: 'Pending' });
        setSelectedPizzaVarieties([]);
        toast.success(`cleared all selected pizza's`)
    }
                     

    return (
        <>
                <div className='d-flex justify-content-end mt-2'>
                    <button style={{ backgroundColor: 'red', marginRight: '20px'}} onClick={handleClear}>clear selected Pizza</button>
                    <button style={{ backgroundColor: 'aqua'}} onClick={handleConfirmAndOrder}>order selected Pizza</button>
                </div>
            <div className="row row-cols-2 row-cols-xl-4">
                {
                    pizzaVarieties.map((pizzaVariety) => {

                        const handleselection = () => {
                            setSelectedPizzaVarieties([ ...selectedPizzaVarieties, pizzaVariety.name]);
                            toast.success(`you selected ${pizzaVariety.name}`) 
                            console.log(selectedPizzaVarieties);
                        }

                        return (
                            <>
                                <div className="my-4" type="button" onClick={handleselection}>
                                    <div className="card" id="card">               
                                        <img  alt="this is pizza variety" src={pizzaVariety.selectedFile} className="card-img-top" id="cardimg" />
                                        <div className="card-body">
                                            <div className="card-title d-flex flex-column">
                                                <span className="ms-0 text-info fs-5 fw-bold">{pizzaVariety.name}</span>                        
                                                <span className="ms-0 text-info fs-7 fw-bold">{`Rs. ${pizzaVariety.cost}`}</span>                        
                                            </div>
                                            <div>
                                                <span id='pizzaVariety_message'>{pizzaVariety.message}</span>
                                            </div>
                                        </div>
                                    </div>            
                                </div>     
                            </>
                        )
                        })
                    
                }               
                <div className="my-4">
                    <div className="card" id="custom_card">               
                        <div className="card-body d-flex flex-column align-items-center justify-content-center" >
                            <div role="button" id='circle_add_icon' onClick={handleCustomNavigate}>
                                <IoAddCircleOutline />
                            </div>
                            <span className='text-success fw-bold fs-6'>Customize your Pizza</span>
                        </div>
                    </div>            
                </div>
            </div>

        </>
    )
}

export default PizzaVarieties;
