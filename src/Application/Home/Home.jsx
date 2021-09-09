import React, {useState, useEffect} from 'react';
import Navbar from '../Components/Navbar';
import RenderClientes from '../Components/RenderClientes';
import firebase from '../Config/firebase';
import 'firebase/database'
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';


export default function Home() {

    const [ clientes, setClientes] = useState([]);
    const [ busca, setBusca ] = useState("");
    const [ caixaBusca, setCaixaBusca ] = useState("");
    const [ excluido, setExcluido ] = useState("");
    const [ confirmacao, setConfirmacao ] = useState(false);
    const [ confirmacaoId, setConfirmacaoId ] = useState("");

    const deleteUser = (id) => {
        firebase.firestore().collection('clientes').doc(id).delete()
            .then(() => {
                setExcluido(id);
                setConfirmacao(false);
            })
    }

    const confirmDelete = (id) =>{
        setConfirmacaoId(id);
        setConfirmacao(true);
    }

    const renderAlert = () => {
        return (
            <SweetAlert
                warning
                showCancel
                showCloseButton
                cancelBtnText="Cancelar"
                cancelBtnBsStyle="light"
                confirmBtnText="Excluir"
                confirmBtnBsStyle="danger"
                title="Você tem certeza? "
                onConfirm={() => deleteUser(confirmacaoId)}
                onCancel={() => setConfirmacao(false)}
                reverseButtons={true}
                >
                Esta operação não pode ser revertida.
            </SweetAlert>
        )
    }

    useEffect(() => {
        document.title = "CRM - Home"
        let listaClientes = [];
        firebase.firestore().collection('clientes').get()
            .then(async resultado => {

                await resultado.docs.forEach(doc => {
                    if(doc.data().nome.indexOf(busca) >= 0){
                        listaClientes.push({
                                id: doc.id,
                                name: doc.data().nome,
                                email: doc.data().email,
                                fone: doc.data().fone
                            })
                    }
                })
                
                setClientes(listaClientes);
            })
    }, [busca, excluido]);

    return (
        <div>
            <Navbar active="navHome" />
            <h1 className="ms-3 mt-3">Clientes</h1>

            <div className="row mx-1 my-2">
                <div className="col-4">
                    <Link to="/cadastrarcliente" className="btn btn-secondary"><i className="fas fa-plus"></i> Cliente</Link>
                </div>
                <div className="col-8">
                    <div className="input-group">
                        <input onChange={e => setCaixaBusca(e.target.value)} type="text" className="form-control" placeholder="Pesquisar"/>
                        <button onClick={() => setBusca(caixaBusca)} className="btn btn-secondary" type="button" id="button-addon2"><i className="fas fa-search"></i> Pesquisar</button>
                    </div>
                </div>
            </div>

            <RenderClientes clientes={clientes} deleteClientes={confirmDelete}/>
            {
               confirmacao ?  renderAlert() : null
            }
        </div>
    )
}
