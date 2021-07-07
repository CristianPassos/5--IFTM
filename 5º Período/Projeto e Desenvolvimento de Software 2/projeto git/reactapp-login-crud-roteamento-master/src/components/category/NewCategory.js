import React, { useState } from "react";
import * as api from "../../services/EndpointsCategory"

const NewCategory = () => {
    const initialStateCategory = {
        id: null,
        name: ""
    };
    const [category, setCategory] = useState(initialStateCategory);
    const [submitted, setSubmitted] = useState(false);

    const trataCampo = (event) => {
        const { name, value } = event.target;
        setCategory({ ...category, [name]: value });
    };

    const newCategory = () => {
        setCategory(initialStateCategory);
        setSubmitted(false);
    };

    const sendCategory = () => {
        var data = {
            name: category.name
        };
        console.log(data)
        api.insert(data)
            .then(response => {
                setCategory({
                    id: response.data.id,
                    name: response.data.name
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => { console.log(e); });
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Categoria cadastrada com sucesso!</h4>
                    <button className="btn btn-success" onClick={newCategory}>Novo</button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="titulo">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={category.name}
                            onChange={trataCampo}
                            name="name"
                        />
                    </div>

                    <button onClick={sendCategory} className="btn btn-success mt-4">Cadastrar</button>
                </div>
            )}
        </div>
    );
}

export default NewCategory;