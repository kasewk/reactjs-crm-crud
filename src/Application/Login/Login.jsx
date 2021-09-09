import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import firebase from '../Config/firebase';
import 'firebase/auth';
import './Login.css';
import { AuthContext } from '../Context/auth';

export default function Login() {

    const [ email, setEmail ] = useState("");
    const [ senha, setSenha ] = useState("");
    const [ sucesso, setSucesso] = useState("");
    const [ message, setMessage] = useState("");
    const {setLogado} = useContext(AuthContext);


    const loginUser = () => {
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(() => {
                localStorage.setItem("logado", "S");
                setLogado(true);
                setSucesso("S");
                setMessage("");
            }).catch(error => {
                localStorage.setItem("logado", "N");
                setLogado(false);
                setSucesso("N");
                setMessage(error.message);
            })
    }

    const renderAlert = () => {
        return (
            <div className="alert alert-danger mt-2" role="alert">
                {message}
            </div>
        )
    }

    const redirectToHome = () => {
        return (
                <Redirect to="/home" />
        )
    }


    return (
        <div className="d-flex align-items-center text-center form-container">  
            <form className="form-signin">
                <img className="mb-4" src="Images/logo-small2.png" alt="" />
                <h1 className="h3 mb-3 fw-normal">Login</h1>

                <div className="form-floating">
                <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="floatingInput" placeholder="E-mail" />
                <label htmlFor="floatingInput">Email</label>
                </div>

                <div className="form-floating">
                <input onChange={e => setSenha(e.target.value)} type="password" className="form-control" id="floatingPassword" placeholder="Senha" />
                <label htmlFor="floatingPassword">Senha</label>
                </div>

                <button className="w-100 btn btn-lg btn-dark" type="button" onClick={loginUser}>Acessar</button>

                {
                    sucesso === "N" ? renderAlert() : sucesso === "S" ? redirectToHome() : null
                }

                <div className="login-links mt-5 ">
                    <Link className="text-dark" to="/registrar">Criar conta</Link>
                    <Link className="text-dark" to="/recuperarsenha">Esqueci minha senha</Link>
                </div>

                <p className="mt-5 mb-3 text-muted">&copy; Desenvolvido por Paulo Paes</p>
            </form>
        </div>  
    )
}
