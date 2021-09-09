import React, {useEffect, useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import './EditarCliente.css';

import firebase from '../Config/firebase';
import 'firebase/firestore';


export default function EditarClientes(props) {
    const [nomeCliente, setNomeCliente] = useState("");
    const [emailCliente, setEmailCliente] = useState("");
    const [telefoneCliente, setTelefoneCliente] = useState("");
    const [sucesso, setSucesso] = useState("N");
    const [message, setMessage] = useState("");
    
    const codigoClienteBD = props.match.params.id;
    useEffect(() => {
        
        document.title = "Editar cliente";
        firebase.firestore().collection('clientes').doc(codigoClienteBD).get()
            .then(doc => {
                let cliente = doc.data();
                setNomeCliente(cliente.nome);
                setEmailCliente(cliente.email);
                setTelefoneCliente(cliente.fone);

            }).catch(error => {
                setMessage(error);
                setSucesso("N");
            })

    });

    const updateClient = () => {

        if(nomeCliente.length === 0){
            setMessage("Informe o nome!");
        }else{

            firebase.firestore().collection("clientes").doc(codigoClienteBD).update({
                nome: nomeCliente,
                email: emailCliente,
                fone: telefoneCliente
            }).then(() => {
                setMessage("");
                setSucesso("S");
            })
            .catch((error) => {
                setMessage(error);
                setSucesso("N")
            })
        }
    }

    return (
        <div>
            <Navbar active="navHome"/>
            <div className="container-fluid">

                <form className="form-reg col-lg-6">
                <h1 className="ms-3 mt-3">Editar cliente</h1>

                    <div className="mb-3">
                        <label htmlFor="exampleInputid1" className="form-label">Código</label>
                        <input value={codigoClienteBD} disabled type="código" className="form-control"/>
                     </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputNome1" className="form-label">Nome</label>
                        <input value={nomeCliente} onChange={e => setNomeCliente(e.target.value)} type="nome" className="form-control"/>
                     </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input value={emailCliente} onChange={e => setEmailCliente(e.target.value)} type="email" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputTelefone1" className="form-label">Telefone</label>
                        <input value={telefoneCliente} onChange={e => setTelefoneCliente(e.target.value)} type="telefone" className="form-control" />
                    </div>
                    <div className="d-flex justify-content-between">
                        <Link to="/home" className="btn btn-outline-danger">Cancelar</Link>
                        <button onClick={updateClient} type="button" className="btn btn-dark">Salvar</button>
                    </div>

                    {
                        message.length > 0 ? <div className="alert alert-danger mt-2 text-center" role="alert">{message}</div> : null
                    }
                    {
                        sucesso === "S" ? <Redirect to="/home" /> : null
                    }

                </form>

            </div>
        </div>
    )
}
