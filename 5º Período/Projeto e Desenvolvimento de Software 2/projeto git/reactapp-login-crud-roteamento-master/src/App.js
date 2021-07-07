import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import ListCategory from "./components/category/ListCategory";
import NewCategory from "./components/category/NewCategory";
import EditCategory from "./components/category/EditCategory";

import ListProduct from "./components/product/ListProduct";
import NewProduct from "./components/product/NewProduct";
import EditProduct from "./components/product/EditProduct";

import ListUser from "./components/user/ListUser";
import NewUser from "./components/user/NewUser";
import EditUser from "./components/user/EditUser";

function App() {
  return (
    <>
      <div className="container-fluid">
        <p className="p-3 mt-0 mb-0 bg-secondary text-white text-end">
          TRABALHO FINAL
        </p>
        <nav className="navbar navbar-expand navbar-dark bg-dark mb-3">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/category"} className="nav-link">
                Categorias
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/product"} className="nav-link">
                Produtos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                Usuários
              </Link>
            </li>
          </div>
        </nav>
      </div>

      <div className="container-fluid">
        <Switch>
          <Route exact path={["/", "/category"]} component={ListCategory} />
          <Route exact path="/category-new" component={NewCategory} />
          <Route path="/category/:id" component={EditCategory} />

          <Route exact path="/product" component={ListProduct} />
          <Route exact path="/product-new" component={NewProduct} />
          <Route path="/product/:id" component={EditProduct} />

          <Route exact path="/user" component={ListUser} />
          <Route exact path="/user-new" component={NewUser} />
          <Route path="/user/:id" component={EditUser} />
        </Switch>
      </div>
    </>
  );
}

export default App;
