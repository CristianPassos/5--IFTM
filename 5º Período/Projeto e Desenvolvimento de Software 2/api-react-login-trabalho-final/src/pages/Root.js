import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import StoreProvider from 'components/Store/Provider';
import RoutesPrivate from 'components/Routes/Private/Private';
import PagesSearch from './Promotion/Search/Search';
import PagesForm from './Promotion/Form/Form';

const Root = () => {
    return (
        <Router>
            <StoreProvider>
                <Switch>
                    <Route path="/login" component={PagesForm} />
                    <RoutesPrivate path="/edit/:id" component={PagesForm} />
                    <RoutesPrivate path="/" component={PagesSearch} />
                </Switch>
            </StoreProvider>
        </Router>
    );
};

export default Root;