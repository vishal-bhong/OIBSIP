import './userNavbar.css';
import { useNavigate } from "react-router-dom";

const UserNavbar = () => {
    const navigate = useNavigate();

    const handleLogoutNavigation = () =>{
        localStorage.removeItem('userProfile')
        navigate('/user/login');
      }
      
    return (
        <>
            <div className="navbar navbar-expand-sm bg-white mt-2 rounded-pill fixed-top">
                <div className="container-fluid">
                    <a className="d-flex text-dark text-decoration-none" data-bs-toggle="offcanvas" role="button">
                    <i className="bi bi-list h3" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" ></i> &nbsp;
                    <span className="pt-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvas">Menu</span>
                    </a>
                    <a href="#" className="navbar-brand text-dark fw-bold" id="nav-brand"> Pizza King </a>
                    <ul className="navbar-nav">
                    
                    <li className="navbar-item px-2">
                        <a type="button" onClick={handleLogoutNavigation} className="navbar-link text-dark text-decoration-none badge bg-danger rounded">Logout</a>
                    </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default UserNavbar;