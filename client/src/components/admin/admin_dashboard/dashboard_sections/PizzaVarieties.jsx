import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import FileBase from 'react-file-base64';
import { CgTrash } from "react-icons/cg";

import './pizza_varieties.css';


const PizzaVarieties = () => {
  const [ newPizzaVarietiesData, setNewPizzaVarietiesData ] = useState({ name: '', message: '', availableCount: '', selectedFile: '' });
  const [ pizzaVarieties, setPizzaVarieties ] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/inventory/get_varieties')
     .then(res => {             
        setPizzaVarieties(res.data);
     })
     .catch((err) => {
         console.log(err);
     })         
  }, []);


  const HandleAddPizzaVarieties = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/inventory/add_varieties', newPizzaVarietiesData)
     .then(res =>{
         toast.success(`successfully added Meat ${res.data.name} `);                                            
     })
     .catch((err) => {
         console.log(err.message)            
     });
   }

    return (
        <>
          <div id='pizza_varieties'>              
            <span className='h4 pt-3 ps-2 fw-bold text-info'>Available Pizza Varieties</span>
            <div className="dropdown" id='varieties_dropdown'>
              <button className="btn dropdown-toggle fw-bold" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                Pizza Varieties &nbsp;
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink" id='dropdown_menu'>
              {
                    pizzaVarieties.map((pizzaVariety) => {

                        const handleDeletePizzaVariety = () => {
                            if(window.confirm(`Do you want to delete Pizza variety "${pizzaVariety.name}" ?`) === true) {
                                axios.delete(`http://localhost:5000/inventory/delete_varieties/${pizzaVariety._id}`)
                                .then((res) => {
                                    toast.success(res.data.message)
                                })
                                .catch((err) => {
                                    console.log(err);
                                })
                            } else {
                                alert("Request Canceled ...");
                            }       
                        } 

                        return (
                            <li className='d-flex flex-row justify-content-between' key={pizzaVariety._id}><span className="dropdown-item my-1">{pizzaVariety.name}</span><span role="button" className='me-2 fs-4' onClick={handleDeletePizzaVariety}><CgTrash className='text-danger' /></span></li>          
                        )
                    })
                }          
                <li><button className="dropdown-item d-flex flex-row justify-content-center mt-2 rounded-pill" id='add_item_link' data-bs-toggle="modal" data-bs-target="#VarietiesModal" >Add More varieties</button></li>
              </ul>
            </div>
          </div>

          <div className="modal" tabIndex="-1" id="VarietiesModal">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-info fw-bold">Add Pizza Meat</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type='text' className="col-12 form-control form-control-lg" placeholder="Name of Pizza Variety" onChange={(e) => setNewPizzaVarietiesData({ ...newPizzaVarietiesData, name: e.target.value })} />
                            <label for="message-text" className="col-form-label fw-bold mt-2">Message:</label>
                            <textarea className="form-control" id="message-text" onChange={(e) => setNewPizzaVarietiesData({ ...newPizzaVarietiesData, message: e.target.value })} />
                            <input type='text' className="col-12 form-control form-control-lg mt-4" placeholder="Availability Pizza" onChange={(e) => setNewPizzaVarietiesData({ ...newPizzaVarietiesData, availableCount: e.target.value })} />
                            <label for="file_input" className="col-form-label fw-bold mt-2">Image of Pizza Variety :</label> <br/>
                            <FileBase type="file" multiple={false} onDone={ ({ base64 }) => setNewPizzaVarietiesData({ ...newPizzaVarietiesData, selectedFile: base64 }) } id='file_input' /> <br />
                            <button className="col-12 mt-3 btn btn-primary" type="submit" onClick={HandleAddPizzaVarieties}>Submit</button>    
                        </div>                       
                    </div>
                </div>
         </div>
        </>
    )
}

export default PizzaVarieties;