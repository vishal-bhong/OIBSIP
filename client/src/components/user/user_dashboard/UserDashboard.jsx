
import UserNavbar from '../userBars/userNavbar/UserNavbar';
import UserSidebar from '../userBars/userSidebar/UserSidebar';
import PizzaVarieties from './pizza_varieties/PizzaVarieties';
import './user_dashboard.css'

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('userProfile'));

    if(!user) {
        return (
            <>
             <h1 style={{ padding: '100px 0 0 150px', fontWeight: 'bold', color: 'red' }}>Please Log in as user to see the dashboard.. </h1>
            </>
        )
    }
    
    return (
        <>
             <UserNavbar />
             <UserSidebar />
             <div className="row">
                 <div className='col-9' id='varieties_dashboard'>
                 <PizzaVarieties />                    
                 </div>
             </div>
        </>
    );
}

export default Dashboard;