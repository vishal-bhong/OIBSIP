import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import FileBase from 'react-file-base64';
import { CgTrash } from "react-icons/cg";


const PizzaCheese = () => {
  const [ newCheeseData, setNewCheeseData ] = useState({ name: '', message: '', availableCount: '', selectedFile: '', cost: '' });
  const [ cheeses, setCheeses ] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/inventory/get_cheese')
     .then(res => {
         setCheeses(res.data);
     })
     .catch((err) => {
         console.log(err);
     })         
 }, []);


  const HandleAddCheese = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/inventory/add_cheese', newCheeseData)
     .then(res =>{
         toast.success(`successfully added Cheese ${res.data.name} `);                                            
     })
     .catch((err) => {
         console.log(err.message)            
     });

   }

    return (
        <>
         <div className="dropstart mt-4" id='dropdown_section'>
              <button className="btn dropdown-toggle fw-bold" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
               &nbsp;Cheese types
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink" id='dropdown_menu'>
                {
                    cheeses.map((cheese) => {

                        const handleDeleteCheese = () => {
                            if(window.confirm(`Do you want to delete cheese "${cheese.name}" ?`) === true) {
                                axios.delete(`http://localhost:5000/inventory/delete_cheese/${cheese._id}`)
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
                            <li className='d-flex flex-row justify-content-between' key={cheese._id}><span className="dropdown-item my-1">{cheese.name}</span><span role="button" className='me-2 fs-4' onClick={handleDeleteCheese}><CgTrash className='text-danger' /></span></li>          
                        )
                    })
                }
                <li><button className="dropdown-item d-flex flex-row justify-content-center mt-2 rounded-pill" id='add_item_link' data-bs-toggle="modal" data-bs-target="#CheeseModal" >Add More cheese types</button></li>
              </ul>
         </div>

         <div className="modal" tabIndex="-1" id="CheeseModal">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-info fw-bold">Add Pizza Cheese</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type='text' className="col-12 form-control form-control-lg" placeholder="Name of Cheese" onChange={(e) => setNewCheeseData({ ...newCheeseData, name: e.target.value })} />
                            <label for="message-text" className="col-form-label fw-bold mt-2">Message:</label>
                            <textarea className="form-control" id="message-text" onChange={(e) => setNewCheeseData({ ...newCheeseData, message: e.target.value })} />
                            <input type='text' className="col-12 form-control form-control-lg mt-4" placeholder="Available count of Base" onChange={(e) => setNewCheeseData({ ...newCheeseData, availableCount: e.target.value })} />
                            <input type='text' className="col-12 form-control form-control-lg mt-4" placeholder="cost of Cheese" onChange={(e) => setNewCheeseData({ ...newCheeseData, cost: e.target.value })} />
                            <label for="file_input" className="col-form-label fw-bold mt-2">Image of Cheese :</label> <br/>
                            <FileBase type="file" multiple={false} onDone={ ({ base64 }) => setNewCheeseData({ ...newCheeseData, selectedFile: base64 }) } id='file_input' /> <br />
                            <button className="col-12 mt-3 btn btn-primary" type="submit" onClick={HandleAddCheese}>Submit</button>    
                        </div>                       
                    </div>
                </div>
         </div>

        </>
    )
}

export default PizzaCheese;