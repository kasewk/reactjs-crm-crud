import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/auth';
import './Navbar.css';

export default function Navbar({ active }) {

    const {setLogado} = useContext(AuthContext);

    const logOut = () => {
        setLogado(false);
        localStorage.removeItem("logado");
    }

    useEffect(() => {
        let item = document.getElementById(active);
        item.classList.add("active");
    })
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">

                    <Link className="navbar-brand" to="/home">
                        <img src="/Images/logo.png" alt="Logo" height="28"/>
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/home" id="navHome">Home</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/cadastrarcliente" id="navNovoCliente">Novo Cliente</Link>
                        </li>
                        <li className="nav-item">
                        <a onClick={logOut} href="/#" className="nav-link logout" >Sair</a>
                        </li>
                        </ul>
                    </div>

            </div>
        </nav>
    )
}
