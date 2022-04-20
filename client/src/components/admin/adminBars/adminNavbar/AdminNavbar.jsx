import './adminNavbar.css';

const AdminNavbar = () => {
    return (
        <>
            <div className="navbar navbar-expand-sm bg-white mt-2 rounded-pill fixed-top" id='navbar'>
                <div className="container-fluid">
                    <a className="d-flex text-dark text-decoration-none" data-bs-toggle="offcanvas" role="button">
                    <i className="bi bi-list h3" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" ></i> &nbsp;
                    <span className="pt-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvas">Menu</span>
                    </a>
                    <a href="#" className="navbar-brand text-dark fw-bold" id="nav-brand"> Pizza King </a>
                    <ul className="navbar-nav">
                    <li className="navbar-item px-2">
                        <a href="/home" className="navbar-link text-dark text-decoration-none">Home</a>
                    </li>
                    <li className="navbar-item px-2">
                        <a className="navbar-link text-dark text-decoration-none">Contact</a>
                    </li>
                    <li className="navbar-item px-2">
                        <a className="navbar-link text-dark text-decoration-none">About us</a>
                    </li>
                    <li className="navbar-item px-2">
                        <a className="navbar-link text-dark text-decoration-none">Messages <span className="badge bg-success rounded">16</span></a>
                    </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default AdminNavbar;