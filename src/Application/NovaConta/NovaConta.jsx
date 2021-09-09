import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './NovaConta.css';
import firebase from '../Config/firebase';
import 'firebase/auth';

export default function NovaConta() {

    const [ email, setEmail ] = useState("");
    const [ senha, setSenha ] = useState("");
    const [ sucesso, setSucesso] = useState("");
    const [ message, setMessage] = useState("");

    const renderAlert = (aler) => {

        return (
                <div className={`alert alert-${aler} mt-2`} role="alert">
                    {message}
                </div>
        )
    }

    const registerUser = () => {
        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(() => {
                setSucesso("S");
                setMessage("Conta criada com suceso");
            }).catch(error => {
                setSucesso("N");
                setMessage(error.message);
            })
    }

    const redirectToLogin = () => {
        return (
                <Redirect to="/" />
        )
    }



    return (
        <div className="d-flex align-items-center text-center form-container">  
            <form className="form-signin">
                <img className="mb-4" src="Images/logo-small2.png" alt="" />
                <h1 className="h3 mb-3 fw-normal">Criar conta</h1>

                <div className="form-floating">
                <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="floatingInput" placeholder="E-mail" />
                <label htmlFor="floatingInput">Email</label>
                </div>

                <div className="form-floating">
                <input onChange={e => setSenha(e.target.value)} type="password" className="form-control" id="floatingPassword" placeholder="Senha" />
                <label htmlFor="floatingPassword">Senha</label>
                </div>

                <button onClick={registerUser} className="w-100 btn btn-lg btn-dark" type="button">Registrar</button>

                {
                    sucesso === "N" ? renderAlert("danger") : sucesso === "S" ? redirectToLogin() : null
                }

                <div className="login-links mt-5 ">
                    <Link className="text-dark" to="/">Já tenho uma conta</Link>
                </div>

                <p className="mt-5 mb-3 text-muted">&copy; Desenvolvido por Paulo Paes</p>
            </form>
        </div>  
    )
}
