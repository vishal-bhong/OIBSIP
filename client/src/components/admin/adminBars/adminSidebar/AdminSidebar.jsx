import React from "react";
import "./adminSidebar.css";
import { useNavigate } from "react-router-dom";
import { CgChevronDoubleLeft } from "react-icons/cg";

const AdminSidebar = () => {
  const navigate = useNavigate();
  
  const handleDashNavigation = () =>{
    navigate('/admin/dashboard');
  };

  const handleLogoutNavigation = () =>{
    localStorage.removeItem('adminProfile');
    navigate('/admin/login');
  }


    return (
        <>
           <div className="offcanvas offcanvas-start bg-dark" tabIndex="-1" id="offcanvas" data-bs-keyboard="true" data-bs-backdrop="false">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title d-none d-sm-block text-white h3" id="offcanvas1">Menu</h5>
                <a type="button" className="text-reset bg-white" data-bs-dismiss="offcanvas" aria-label="Close">
                  <CgChevronDoubleLeft className="fs-1 pt-2 bg-dark text-white" />
                </a>                
              </div>
                <hr className="text-white fw-bold" />
              <div className="offcanvas-body px-0">
                  <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">

                      <li className="nav-item pb-3" id="nav-item">
                        <a type="button" onClick={handleDashNavigation} data-bs-toggle="collapse" className="nav-link text-truncate"  id="nav-item-name">
                            <i className="bi bi-microsoft h4"></i><span className="ms-3 d-none d-sm-inline h5">Dashboard</span> </a>
                      </li>

                      <li className="nav-item pb-3" id="nav-item">
                        <a type="button" onClick={handleLogoutNavigation} className="nav-link text-truncate"  id="nav-item-name">
                            <i className="bi bi-house-door h4"></i><span className="ms-3 d-none d-sm-inline h5">Logout</span>
                        </a>
                      </li>
                
                  </ul>
              </div>
           </div>
        </>
    )
}

export default AdminSidebar;