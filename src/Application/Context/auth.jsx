import React, { useState } from 'react';

const AuthContext = React.createContext({});

const AuthProvider = (props) => {
    let isLogged = localStorage.getItem('logado');
    const [logado, setLogado] = useState(isLogged === "S" ? true : false);

    return (
        <AuthContext.Provider value={{logado, setLogado}}>
            {props.children}
        </AuthContext.Provider>
    )
}


export {AuthContext, AuthProvider};

