import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import CerrarSession from '../auth/CerrarSession';

const Navbar = ({ session }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
            <div className="container">
                <Link to="/" className="navbar-brand text-light font-weight-bold">
                    Home
                </Link>
                { (session.obtenerUsuario) ? NavbarForAuthUsers() : NavbarForNoAuthUsers() }
            </div>
        </nav>
    );
};

const NavbarForAuthUsers = () => {
    return (
        <Fragment>
            <button className="navbar-toggler mb-2" type="button" data-toggle="collapse" data-target="#main-Navbar" aria-controls="main-Navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="main-Navbar">
                <ul className="navbar-nav ml-auto text-right">

                    <li className="nav-item mr-lg-2 mb-2 mb-lg-0">
                        <Link to="/user-administration" className="nav-link btn btn-block btn-success">User Administration</Link>
                    </li>
                    <CerrarSession />
                </ul>
            </div>
        </Fragment>
    );
}

const NavbarForNoAuthUsers = () => {
    return (
        <Fragment>
            <button className="navbar-toggler mb-2" type="button" data-toggle="collapse" data-target="#main-Navbar" aria-controls="main-Navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="main-Navbar">
                <ul className="navbar-nav ml-auto text-right">

                    <li className="nav-item mr-lg-2 mb-2 mb-lg-0">
                        <Link to="/registro" className="nav-link btn btn-block btn-success">Registrarse</Link>
                    </li>

                    <li className="nav-item mr-lg-2 mb-2 mb-lg-0">
                        <Link to="/login" className="nav-link btn btn-block btn-success">Acceder</Link>
                    </li>

                </ul>
            </div>
        </Fragment>
    );
}

export default Navbar;