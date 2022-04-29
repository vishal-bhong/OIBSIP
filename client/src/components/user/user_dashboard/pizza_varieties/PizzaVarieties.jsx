import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './pizza_varieties.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { IoAddCircleOutline } from "react-icons/io5";

const PizzaVarieties = () => {
    const [ pizzaVarieties, setPizzaVarieties ] = useState([]);
    const navigate = useNavigate();
    const [ pizzaOrder, setPizzaOrder ] = useState({ Pizza_Variety: [], Base: [], Sauce: [], Cheese: [], Veggies: [], name: '', userId: '', email: '', mobileNo: '', amountPaid: null, type: 'pizza_variety', status: 'Pending' });
    const [ selectedPizzaVarieties, setSelectedPizzaVarieties ] = useState([]);
    const [ selectedPizzaCosts, setSelectedPizzaCosts ] = useState([]);

    const user = JSON.parse(localStorage.getItem("userProfile"));

    React.useEffect(() => {
        setPizzaOrder({ ...pizzaOrder, Pizza_Variety: selectedPizzaVarieties, name: user?.result?.name, userId: user?.result?._id, email: user?.result?.email, mobileNo: user?.result?.mobileNo, amountPaid: selectedPizzaCosts.reduce((a, b) => a + b, 0) });
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

    const paymentProcess = (data) => {
		const options = {
			key: "rzp_test_ToloqmvsWNJBgl",
			amount: data.amount,
			currency: data.currency,
			name: pizzaOrder.Pizza_Variety,
			description: "Test Transaction",
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = "http://localhost:5000/inventory/payment/verify";
					const { data } = await axios.post(verifyUrl, { response, pizzaOrder });
					console.log(data);
                    toast.success(`order placed successfully`); 
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

    const handleConfirmAndOrder = async () => {
        if(window.confirm(`Confirm your order "${pizzaOrder.Pizza_Variety}" with amount to be paid: ${pizzaOrder.amountPaid} ?`) === true) {
                try {
                    const orderUrl = "http://localhost:5000/inventory/payment/order";
                    const { data } = await axios.post(orderUrl, { amount: pizzaOrder.amountPaid });
                    console.log(data);
                    paymentProcess(data.data);
                } catch (error) {
                    console.log(error);
                }
        } else {
            alert("Request Canceled ...");
        }
      }  

    const handleClear = () => {
        setPizzaOrder({ Pizza_Variety: [], Base: [], Sauce: [], Cheese: [], Veggies: [], name: '', userId: '', email: '', mobileNo: '', amountPaid: null, type: 'pizza_variety', status: 'Pending' });
        setSelectedPizzaVarieties([]);
        setSelectedPizzaCosts([]);
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
                            setSelectedPizzaVarieties([...selectedPizzaVarieties, pizzaVariety.name ]);
                            setSelectedPizzaCosts([...selectedPizzaCosts, pizzaVariety.cost ]);
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
