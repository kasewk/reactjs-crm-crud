import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './EsqueciSenha.css';
import firebase from '../Config/firebase';
import 'firebase/auth';

export default function EsqueciSenha() {

    const [ email, setEmail] = useState("");
    const [ message, setMessage] = useState("");
    const [ sucesso, setSucesso] = useState("");

    const renderAlert = (aler) => {

        let ret = null;

        /*if(aler === "success"){
            setTimeout(() => {
              ret = redirectToLogin();
            }, 2500)
        }*/

        return (
            <div>
                <div className={`alert alert-${aler} mt-2`} role="alert">
                    {message}
                </div>
                {ret ? ret : null}
             </div>
        )
    }
    const recoverPassword = () => {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                setMessage("Email enviado com sucesso");
                setSucesso("S");
            }).catch(error => {
                setMessage(error.message);
                setSucesso("N");
            })
    }

    return (
        <div className="d-flex align-items-center text-center form-container">  
            <form className="form-signin">
                <img className="mb-4" src="Images/logo-small2.png" alt="" />
                <h1 className="h3 mb-3 fw-normal">Recuperar Senha</h1>

                <div className="form-floating">
                <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="floatingInput" placeholder="E-mail" />
                <label htmlFor="floatingInput">Email</label>
                </div>

                <button onClick={recoverPassword} className="w-100 btn btn-lg btn-dark mt-2" type="button">Enviar Email</button>

                {
                    sucesso === "N" ? renderAlert("danger") : sucesso === "S" ? renderAlert("success") : null
                }

                <div className="login-links mt-2 ">
                    <Link className="text-dark" to="/">Voltar</Link>
                    <Link className="text-dark" to="/registrar">Criar uma conta</Link>
                </div>

                <p className="mt-5 mb-3 text-muted">&copy; Desenvolvido por Paulo Paes</p>
            </form>
        </div>  
    )
}
