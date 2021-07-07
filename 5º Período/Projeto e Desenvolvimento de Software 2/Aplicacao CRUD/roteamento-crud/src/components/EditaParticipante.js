import React, { useState, useEffect } from "react";
import * as api from "../services/Endpoints"

const EditaParticipante = props => {
    const estadoInicial = {
        id: null,
        titulo: "",
        autor: "",
    };

    const [livro, setLivro] = useState(estadoInicial);
    const [message, setMessage] = useState("");

    const getLivro = (id) => {
        api.get(id)
            .then(response => {
                setLivro(response.data);
                console.log('Editar Participantes :'+response.data);
            })
            .catch(e => {
                console.log('Message catch :'+e);
            });
    };

    useEffect(() => {
        getLivro(props.match.params.id);
    }, [props.match.params.id]);

    const trataCampo = event => {
        const { name, value } = event.target;
        setLivro({ ...livro, [name]: value });
    };

    const atualizarLivro = () => {
        api.update(livro.id, livro)
            .then(response => {
                console.log(response.data);
                setMessage("Partcipante atualizado!");
            })
            .catch(e => { console.log(e); });
    };

    const excluirLivro = () => {
        api.remove(livro.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/participantes");
            })
            .catch(e => { console.log(e); });
    };

    return (
        <div>
            {livro ? (
                <div className="edit-form">
                    <h4>Livro</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="titulo">Titulo</label>
                            <input
                                type="text"
                                className="form-control"
                                id="titulo"
                                name="titulo"
                                value={livro.titulo}
                                onChange={trataCampo}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="description">Autor</label>
                            <input
                                type="text"
                                className="form-control"
                                id="autor"
                                name="autor"
                                value={livro.autor}
                                onChange={trataCampo}
                            />
                        </div>
                    </form>

                    <button className="btn btn-warning danger mt-3" onClick={excluirLivro}>Excluir</button>
                    <button type="submit" className="btn btn-success mt-3 mx-3" onClick={atualizarLivro}>
                        Atualizar
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Selecione um livro ...</p>
                </div>
            )}
        </div>
    );

};

export default EditaParticipante;