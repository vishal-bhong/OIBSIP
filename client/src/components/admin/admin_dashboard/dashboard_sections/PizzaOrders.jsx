import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import './pizza_orders.css';

const PizzaOrders = () => {
  const [ orders, setOrders ] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/inventory/get_orders')
    .then(res => {             
      setOrders(res.data);
    })
    .catch((err) => {
        console.log(err);
    })
  }, []);

  return (
        <>
          <div id='pizza_orders'>              
            <span className='h3 text-info fw-bold ps-2' >Orders -</span>
            <table className="table mt-3">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">mobile no.</th>
                <th scope="col">address</th>
                <th scope="col">order type</th>
                <th scope="col">status</th>
              </tr>
            </thead>
            <tbody>
              {
                orders.map((order) => {

                  const handleStatus = (id, status) => {
                    axios.post('http://localhost:5000/inventory/update_order_status', { id, status })
                      .then((res) => {                       
                         toast.success(res.data.message);
                        })
                      .catch((err) => {
                         console.log(err);                                           
                      })
                  }

                  return (<>
                              <tr>
                                <th scope="row" type='button' data-bs-toggle="modal" data-bs-target="#orderModal">{order.name}</th>
                                <td type='button' data-bs-toggle="modal" data-bs-target="#orderModal">{order.email}</td>
                                <td type='button' data-bs-toggle="modal" data-bs-target="#orderModal">{order.mobileNo}</td>
                                <td>a/p nimgaon ketki tal. indapur dist. pune</td>
                                <td>{order.type}</td>
                                <td>
                                    <div class="dropend">
                                      <button type="button" id='statusDisplayButton' class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        {order.status}&nbsp;
                                      </button>
                                      <ul class="dropdown-menu">
                                        <li type='button' className='ps-3 pb-1 border-bottom' onClick={() => handleStatus(order._id, 'Pending')}>Pending</li>
                                        <li type='button' className='ps-3 py-1 border-bottom' onClick={() => handleStatus(order._id, 'Confirmed')}>Confirmed</li>
                                        <li type='button' className='ps-3 py-1 border-bottom' onClick={() => handleStatus(order._id, 'In kitchen')}>In kitchen</li>
                                        <li type='button' className='ps-3 py-1 border-bottom' onClick={() => handleStatus(order._id, 'shipped')}>shipped</li>
                                        <li type='button' className='ps-3 py-1 border-bottom' onClick={() => handleStatus(order._id, 'Delivered')}>Delivered</li>
                                        <li type='button' className='ps-3 py-1 bg-danger text-white' onClick={() => handleStatus(order._id, 'Rejected')}>Rejected</li>
                                      </ul>
                                    </div>
                                </td>
                              </tr>

                              <div className="modal" tabIndex="-1" id="orderModal">
                                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                      <div className="modal-content">
                                          <div className="modal-header">
                                            <h5 className="modal-title text-info fw-bold">Order Details</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                          </div>
                                          <div className="modal-body">
                                            <strong>Name: {order.name}</strong> <br />
                                            <span>email: {order.email}</span>    <br />                                               
                                            <span>mobile No. : {order.mobileNo}</span> <br /> <br />
                                            { (order.type == 'pizza_variety') ? 
                                              (<>
                                                <span>pizza variety: {order.Pizza_Variety} </span> <br />
                                              </>) : 
                                              (<>
                                                <span>Pizza base: {order.Base}</span><br/>
                                                <span>Pizza Sauce: {order.Sauce}</span><br/>
                                                <span>Pizza Cheese: {order.Cheese}</span><br/>
                                                <span>Pizza Veggies: {order.Veggies}</span><br/>
                                              </>)
                                            }
                                            <strong>Amount Paid: &nbsp; {order.amountPaid}</strong>
                                          </div>                       
                                      </div>
                                  </div>
                              </div>
                          </>
                        )
                })
              }
            </tbody>
          </table>
          </div>
        </>
    )
}

export default PizzaOrders;