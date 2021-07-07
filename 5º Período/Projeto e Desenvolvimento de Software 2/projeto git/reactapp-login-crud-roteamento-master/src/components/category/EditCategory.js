import React, { useState, useEffect } from "react";
import * as api from "../../services/EndpointsCategory"

const EditCategory = props => {
    
    const initialState = {
        id: null,
        name: ""
    };

    const [category, setCategory] = useState(initialState);
    const [message, setMessage] = useState("");

    const getCategory = (id) => {
        
        api.findById(id)
            .then(response => {
                setCategory(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getCategory(props.match.params.id);
    }, [props.match.params.id]);

    const trataCampo = event => {
        const { name, value } = event.target;
        setCategory({ ...category, [name]: value });
    };

    const updateCategory = () => {
        api.update(category.id, category)
            .then(response => {
                console.log(response.data);
                setMessage("Categoria atualizada!");
            })
            .catch(e => { console.log(e); });
    };

    const removeCategory = () => {
        api.remove(category.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/category");
            })
            .catch(e => { console.log(e); });
    };

    return (
        <div>
            {category ? (
                <div className="edit-form">
                    <h4>Categoria</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="titulo">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={category.name}
                                onChange={trataCampo}
                            />
                        </div>
                    </form>

                    <button className="btn btn-warning danger mt-3" onClick={removeCategory}>Excluir</button>
                    <button type="submit" className="btn btn-success mt-3 mx-3" onClick={updateCategory}>
                        Atualizar
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Selecione uma categoria...</p>
                </div>
            )}
        </div>
    );
}

export default EditCategory;