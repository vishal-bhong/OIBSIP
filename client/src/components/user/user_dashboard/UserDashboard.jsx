
import UserNavbar from '../userBars/userNavbar/UserNavbar';
import UserSidebar from '../userBars/userSidebar/UserSidebar';

const Dashboard = () => {
    return (
        <>
        <UserNavbar />
        <UserSidebar />
        <h1 className="mt-5 pt-5">This is Dashboard for user</h1>
        </>
    );
}

export default Dashboard;