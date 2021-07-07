import React, { useState } from "react";
import * as api from "../services/Endpoints"

const NovoParticipante = () => {
    const estadoInicialParticipante = {
        id: null,
        nome: "",
        cpf: "",
    };
    const [participante, setParticipante] = useState(estadoInicialParticipante);
    const [submitted, setSubmitted] = useState(false);

    const trataCampo = (event) => {
        const { name, value } = event.target;
        setParticipante({ ...participante, [name]: value });
    };

    const novo = () => {
        setParticipante(estadoInicialParticipante);
        setSubmitted(false);
    };

    const enviarRequisicao = () => {
        var data = {
            nome: participante.nome,
            cpf: participante.cpf
        };
        console.log('Requisição :'+data)
        api.create(data)
            .then(response => {
                setParticipante({
                    id: response.data.id,
                    nome: response.data.nome,
                    cpf: response.data.cpf,
                });
                setSubmitted(true);
                console.log('Requisição Enviada :'+response.data);
            })
            .catch(e => { console.log('Message catch :'+e); });
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Participante cadastrado com sucesso!</h4>
                    <button className="btn btn-success" onClick={novo}>Novo</button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="titulo">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nome"
                            required
                            value={participante.nome}
                            onChange={trataCampo}
                            name="nome"
                        />
                    </div>

                    <div className="form-group mt-4">
                        <label htmlFor="description">CPF</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cpf"
                            required
                            value={participante.cpf}
                            onChange={trataCampo}
                            name="cpf"
                        />
                    </div>

                    <button onClick={enviarRequisicao} className="btn btn-success mt-4">Cadastrar</button>
                </div>
            )}
        </div>
    );
}

export default NovoParticipante;