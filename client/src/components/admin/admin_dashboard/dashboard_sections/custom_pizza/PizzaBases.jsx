import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import FileBase from 'react-file-base64';
import { CgTrash } from "react-icons/cg";


const PizzaBases = () => {
    const [ newBaseData, setNewBaseData ] = useState({ name: '', message: '', availableCount: '', selectedFile: '' });
    const [ bases, setBases ] = useState([]);
 
    useEffect(() => {
        axios.get('http://localhost:5000/inventory/get_bases')
         .then(res => {             
             setBases(res.data);
         })
         .catch((err) => {
             console.log(err);
         })         
    }, []);

    const HandleAddBase = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/inventory/add_bases', newBaseData)
         .then(res =>{ 
             toast.success(`successfully added base ${res.data.name} `);                                   
         })
         .catch((err) => {
             console.log(err.message)            
         });
    }


    return (
        <>
            <div className="dropstart mt-4" id='dropdown_section'>
                <button className="btn dropdown-toggle fw-bold" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" >
                &nbsp;Pizza Bases
                </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink" id='dropdown_menu'>
                  {
                      bases.map((base) => {

                        const handleDeleteBase = () => {
                            if(window.confirm(`Do you want to delete base "${base.name}" ?`) === true) {
                                axios.delete(`http://localhost:5000/inventory/delete_bases/${base._id}`)
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
                              <li className='d-flex flex-row justify-content-between' key={base._id}><span className="dropdown-item my-1">{base.name}</span><span role='button' className='me-2 fs-4' onClick={handleDeleteBase}><CgTrash className='text-danger'/></span></li>
                          )
                    })
                }    

                <li><button className="dropdown-item d-flex flex-row justify-content-center mt-2 rounded-pill" data-bs-toggle="modal" data-bs-target="#BaseModal" id='add_item_link'>Add More bases</button></li>
            </ul>
            </div>

            <div className="modal" tabIndex="-1" id="BaseModal">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-info fw-bold">Add Pizza base</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type='text' className="col-12 form-control form-control-lg" placeholder="Name of Base" onChange={(e) => setNewBaseData({ ...newBaseData, name: e.target.value })} />
                            <label for="message-text" className="col-form-label fw-bold mt-2">Message:</label>
                            <textarea className="form-control" id="message-text" onChange={(e) => setNewBaseData({ ...newBaseData, message: e.target.value })} />
                            <input type='text' className="col-12 form-control form-control-lg mt-4" placeholder="Available count of Base" onChange={(e) => setNewBaseData({ ...newBaseData, availableCount: e.target.value })} />
                            <label for="file_input" className="col-form-label fw-bold mt-2">Image of base :</label> <br/>
                            <FileBase type="file" multiple={false} onDone={ ({ base64 }) => setNewBaseData({ ...newBaseData, selectedFile: base64 }) } id='file_input' /> <br />
                            <button className="col-12 mt-3 btn btn-primary" type="submit" onClick={HandleAddBase}>Submit</button>    
                        </div>                       
                    </div>
                </div>
            </div>
        </>
    )
}

export default PizzaBases;

