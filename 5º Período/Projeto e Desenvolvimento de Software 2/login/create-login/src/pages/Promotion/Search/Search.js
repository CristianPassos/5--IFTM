import React, { useEffect, useState } from 'react';
import PromotionCard from 'components/Promotion/Card/Card';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const PagesPromotionSearch = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const [promotions, setPromotions] = useState([]);
    const history = useHistory();
    useEffect(() => {
        axios.get('http://localhost:5000/promotions?_embed=comments')
        .then((response) => {
            setPromotions(response.data)
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
                <h1>Promo Show</h1>
                <h3>{params.get('email')}, seja bem-vindo! <button onClick={deslogar}>Deslogar</button></h3>
                <h2>Promoções</h2>
            </header>
            {promotions.map((promotion) =>(
                <PromotionCard promotion={promotion} />
            ))}
        </div>
    );
};

export default PagesPromotionSearch;