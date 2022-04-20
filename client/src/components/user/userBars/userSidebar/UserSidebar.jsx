import React from "react";
import "./userSidebar.css";
import { CgChevronDoubleLeft } from "react-icons/cg";

const UserSidebar = () => {

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
                        <a href="/home" data-bs-toggle="collapse" className="nav-link text-truncate"  id="nav-item-name">
                            <i className="bi bi-microsoft h4"></i><span className="ms-3 d-none d-sm-inline h5">Dashboard</span> </a>
                      </li>

                      <li className="nav-item pb-3" id="nav-item">
                        <a href="/home" className="nav-link text-truncate"  id="nav-item-name">
                            <i className="bi bi-house-door h4"></i><span className="ms-3 d-none d-sm-inline h5">Home</span>
                        </a>
                      </li>

                      <li className="nav-item pb-3" id="nav-item">
                        <a href="#" className="nav-link text-truncate"  id="nav-item-name">
                            <i className="bi bi-person h4"></i><span className="ms-3 d-none d-sm-inline h5">User</span>
                        </a>
                      </li>

                      <li className="nav-item pb-3" id="nav-item">
                        <a href="/register" className="nav-link text-truncate"  id="nav-item-name">
                          <i className="bi bi-check-circle h4"></i><span className="ms-3 d-none d-sm-inline h5">Register</span>
                        </a>
                      </li>

                      <li className="nav-item pb-3" id="nav-item">
                        <a href="#" className="nav-link text-truncate"  id="nav-item-name">
                           <i className="bi bi-cart h4"></i><span className="ms-3 d-none d-sm-inline h5">Orders</span>
                        </a>
                      </li>

                      <li className="nav-item pb-3" id="nav-item">
                        <a href="#" className="nav-link text-truncate"  id="nav-item-name">
                           <i className="bi bi-chat-right h4"></i><span className="ms-3 d-none d-sm-inline h5">Messages</span>
                        </a>
                      </li>

                      <li className="nav-item pb-3" id="nav-item">
                        <a href="#" data-bs-toggle="collapse" className="nav-link text-truncate"  id="nav-item-name">
                            <i className="bi bi-patch-exclamation h4"></i><span className="ms-3 d-none d-sm-inline h5">About us</span> </a>
                      </li>

                      <li className="dropdown pb-3" id="nav-item">
                            <a href="#" className="nav-link dropdown-toggle text-truncate" id="dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bi bi-arrow-down-circle h4"></i><span className="ms-3 d-none d-sm-inline h5">Options</span>
                            </a>
                            <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdown">
                                <li><a className="dropdown-item" href="#">New project...</a></li>
                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                <li><a className="dropdown-item" href="#">Profile</a></li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li><a className="dropdown-item" href="#">Sign out</a></li>
                            </ul>
                      </li>                
                  </ul>
              </div>
           </div>
        </>
    )
}

export default UserSidebar;