import React, { useContext } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from './Application/Login/Login';
import NovaConta from './Application/NovaConta/NovaConta';
import EsqueciSenha from './Application/EsqueciSenha/EsqueciSenha';
import Home from './Application/Home/Home';
import NovoCliente from './Application/NovoCliente/NovoCliente';
import EditarClientes from './Application/EditarClientes/EditarClientes';
import { AuthContext } from './Application/Context/auth';




export default function App() {

    const {logado} = useContext(AuthContext);

    const SecureRoute = ({...params}) => {
        if(!logado){
            return <Redirect to="/" />
        }else{
            return <Route {...params} />
        }
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login}/>
                <SecureRoute exact path='/registrar' component={NovaConta}/>
                <SecureRoute exact path='/recuperarsenha' component={EsqueciSenha}/>
                <SecureRoute exact path='/home' component={Home}/>
                <SecureRoute exact path='/cadastrarcliente' component={NovoCliente}/>
                <SecureRoute exact path='/editarcliente/:id' component={EditarClientes}/>
            </Switch>
        </BrowserRouter>
    )
}
