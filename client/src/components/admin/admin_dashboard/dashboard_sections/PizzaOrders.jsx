
import './pizza_orders.css';

const PizzaOrders = () => {
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
                <th scope="col">order</th>
                <th scope="col">status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">vishal bhong</th>
                <td>Mark@gmail.com</td>
                <td>7397974785</td>
                <td>@mdo</td>
                <td>chicken khopta</td>
                <td>rejected</td>
              </tr>
              <tr>
                <th scope="row">rohan dalavi</th>
                <td>Jacob@gmail.com</td>
                <td>646465</td>
                <td>@fat</td>
                <td>chicken lollipop</td>
                <td>confirm</td>
              </tr>
              <tr>
                <th scope="row" className='overflow-hidden'>saurabh kuchekar</th>
                <td>Larry@gmail.com</td>
                <td>1254674562</td>
                <td>@twitter</td>
                <td>Greek pizza</td>
                <td>in kitchen</td>
              </tr>
            </tbody>
          </table>
          </div>
        </>
    )
}

export default PizzaOrders;