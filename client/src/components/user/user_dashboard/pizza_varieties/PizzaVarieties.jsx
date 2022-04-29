import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PizzaVariety from "./pizza_variety/PizzaVariety";
import './pizza_varieties.css';
import { useNavigate } from 'react-router-dom';

import { IoAddCircleOutline } from "react-icons/io5";

const PizzaVarieties = () => {
    const [ pizzaVarieties, setPizzaVarieties ] = useState([]);
    const navigate = useNavigate();
    const [ pizzaOrder, setPizzaOrder ] = useState({ Pizza_Variety: [], Base: [], Sauce: [], Cheese: [], Veggies: [], name: '', userId: '', email: '', mobileNo: '', type: 'pizza_variety', status: 'Pending' });

    const user = JSON.parse(localStorage.getItem("userProfile"));

    React.useEffect(() => {
        setPizzaOrder({ ...pizzaOrder, name: user?.result?.name, userId: user?.result?._id, email: user?.result?.email, mobileNo: user?.result?.mobileNo });
    },[]);


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
                     

    return (
        <>
            <div className="row row-cols-2 row-cols-xl-4">
                {
                    pizzaVarieties.map((pizzaVariety) =>
                        <PizzaVariety key={pizzaVariety._id} pizzaVariety={pizzaVariety} pizzaOrder={pizzaOrder} setPizzaOrder={setPizzaOrder} />
                    )
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
