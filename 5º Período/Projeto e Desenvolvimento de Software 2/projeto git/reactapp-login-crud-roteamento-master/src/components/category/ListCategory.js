import React, { useState, useEffect } from "react";
import * as api from "../../services/EndpointsCategory"
import { Link } from "react-router-dom";

const ListCategory = () => {
    const [categories, setCategories] = useState([]);
    const [categorySelected, setCategorySelected] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        searchCategories();
    }, []);

    const searchCategories = () => {
        api.findAll()
            .then(response => {
                setCategories(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const setActiveCategory = (category, index) => {
        setCategorySelected(category);
        setCurrentIndex(index);
    };

    return (
        <>
            <div className="row text-center">
                <h4>Categorias</h4>
            </div>
            <div className="list row mt-3">
                <div className="col-md-6">
                    <ul className="list-group py-1">
                        {categories &&
                            categories.map((category, index) => (
                                <li  className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                    onClick={() => setActiveCategory(category, index)}
                                    key={index}
                                >{category.name}</li>
                            ))}
                    </ul>
                </div>


                <div className="col-md-6">
                    {categorySelected ? (
                        <div>
                            <h4 className="text-center">Detalhe</h4>
                            <div className="mb-3">
                                <label>
                                    <strong>Nome:</strong>
                                </label>{" "}
                                {categorySelected.name}
                            </div>

                            <Link to={"/category/" + categorySelected.id} className="btn btn-warning">Editar</Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Escolha uma categoria...</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ListCategory;