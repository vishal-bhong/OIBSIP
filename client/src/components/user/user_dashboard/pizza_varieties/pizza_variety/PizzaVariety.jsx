import React, { useState } from 'react';
import './pizza_variety.css';

const PizzaVariety = ({ pizzaVariety, setPizzaOrder, pizzaOrder }) => {
    const [ selectedPizzaVarieties, setSelectedPizzaVarieties ] = useState([]);

    const handleselection = () => {
        setSelectedPizzaVarieties([ ...selectedPizzaVarieties, pizzaVariety.name]);
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
                        </div>
                        <div>
                            <span id='pizzaVariety_message'>{pizzaVariety.message}</span>
                        </div>
                    </div>
                </div>            
            </div>     
        </>
    )
}

export default PizzaVariety;