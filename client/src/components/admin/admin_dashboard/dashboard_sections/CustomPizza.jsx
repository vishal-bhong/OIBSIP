import './custom_pizza.css';

import PizzaBases from './custom_pizza/PizzaBases';
import PizzaSauce from './custom_pizza/PizzaSauce';
import PizzaCheese from './custom_pizza/PizzaCheese';
import PizzaVeggies from './custom_pizza/PizzaVeggies';
import PizzaMeat from './custom_pizza/PizzaMeat';

const CustomPizza = () => {
    return (
        <>
          <div id='custom_pizza'>              
            <span className='row h4 text-info ps-3 fw-bold' id='custom_title'>Available Pizza Ingredients -</span>

            <PizzaBases />

            <PizzaSauce />

            <PizzaCheese /> 

            <PizzaVeggies />

            <PizzaMeat />
          </div>  
        </>
    )
}

export default CustomPizza;