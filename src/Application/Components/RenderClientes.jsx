import React from 'react';
import { Link } from 'react-router-dom';
import './RenderClientes.css';


export default function RenderClientes({ clientes, deleteClientes }) {


    return (
        <div>
            <table className="table table-hover table-bordered border border-secondary tabela">
                <thead>
                    <tr className="table-dark border border-secondary">
                    <th scope="col">Código</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Email</th>
                    <th scope="col">Telefone</th>
                    <th scope="col" className="col-acoes"></th>
                    </tr>
                </thead>
                <tbody>
                    
                        {
                            clientes.map(cliente => {
                                return (
                                    <tr key={cliente.id}>
                                        <th>{cliente.id}</th>
                                        <td>{cliente.name}</td>
                                        <td>{cliente.email}</td>
                                        <td>{cliente.fone}</td>
                                        <td className="text-center botoes-acao">
                                            <Link to={`/editarcliente/${cliente.id}`}>
                                                <i className="fas fa-edit text-warning me-3"></i>
                                            </Link>
                                            <Link to="#" onClick={() => deleteClientes(cliente.id)}>
                                                <i className="fas fa-trash-alt text-danger"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                </tbody>
            </table>
        </div>
    )
}
