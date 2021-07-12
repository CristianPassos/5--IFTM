import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const PagesHome = () => {
    const home = window.location.home;
    const params = new URLSearchParams(home);
    const history = useHistory();
    
    //Colocar o conteudo da Home
    useEffect(() => {
        axios.get('http://localhost:5000/promotions?_embed=comments')
        .then((response) => {
            console.log(response.data);
        });
    }, []);

    function deslogar(ev) {
        localStorage.clear();
        history.push('/login');

    }    

    return (
        <div className="promotion-search" style={{
            maxWidth: 800,
            margin: '30px auto'
        }}>
            <header className="promotion-search__header">
                <h1>Home</h1>
                <h3>{params.get('email')} seja bem-vindo! </h3> 
                <p><button onClick={deslogar}> Deslogar</button></p>                
            </header>
        </div>
    );
};

export default PagesHome;