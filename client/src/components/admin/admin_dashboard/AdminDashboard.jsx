
import AdminNavbar from '../adminBars/adminNavbar/AdminNavbar';
import AdminSidebar from '../adminBars/adminSidebar/AdminSidebar';
import CustomPizza from './dashboard_sections/CustomPizza';
import PizzaOrders from './dashboard_sections/PizzaOrders';
import PizzaVarieties from './dashboard_sections/PizzaVarieties';


const Dashboard = () => {
    return (
        <>
        <AdminNavbar />
        <AdminSidebar />
        <div className='row'>
            <div className='col-8'>                
                <PizzaVarieties />
                <PizzaOrders />                
            </div>
            <div className='col-4'>
                <CustomPizza />
            </div>
        </div>
        </>
    );
}

export default Dashboard;