import React, { useState, useEffect } from "react";
import * as api from "../services/Endpoints"
import { Link } from "react-router-dom";

const Participantes = () => {
    const [participantes, setParticipantes] = useState([]);
    const [participanteSelecionado, setParticipanteSelecionado] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(
        () => {buscaLivros();},
        []);

    const buscaLivros = () => {
        api.getAll()
            .then(response => {
                setParticipantes(response.data);
                console.log('Lista de Participantes : '+response.data);
            })
            .catch(e => {
                console.log('Message catch :'+e);
            });
    };

    const setParticipanteAtivo = (participante, index) => {
        setParticipanteSelecionado(participante);
        setCurrentIndex(index);
    };

    return (
        <div className="list row">
            <div className="col-md-6">
                <h4>Arrematantes do leilão</h4>
                <ul className="list-group py-1">
                    {participantes &&
                    participantes.map((participante, index) => (
                        <li  className={"list-group-item " + (index === currentIndex ? "active" : "")}
                             onClick={() => setParticipanteAtivo(participante, index)}
                             key={index}
                        >{participante.nome}</li>
                    ))}
                </ul>
            </div>


            <div className="col-md-6">
                {participanteSelecionado ? (
                    <div>
                        <h4>Detalhe</h4>
                        <div>
                            <label>
                                <strong>Nome:</strong>
                            </label>{" "}
                            {participanteSelecionado.nome}
                        </div>
                        <div>
                            <label>
                                <strong>CPF:</strong>
                            </label>{" "}
                            {participanteSelecionado.cpf}
                        </div>

                        <Link to={"/participantes/" + participanteSelecionado.id} className="btn btn-warning">Editar</Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Escolha um participante ao lado para editar</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Participantes;