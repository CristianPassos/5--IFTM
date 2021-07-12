import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import StoreProvider from 'components/Store/Provider';
import RoutesPrivate from 'components/Routes/Private/Private';
import PagesPromotionSearch from './Promotion/Search/Search';
import PagesPromotionForm from './Promotion/Form/Form';

const Root = () => {
    return (
        <Router>
            <StoreProvider>
                <Switch>
                    <Route path="/login" component={PagesPromotionForm} />
                    <RoutesPrivate path="/edit/:id" component={PagesPromotionForm} />
                    <RoutesPrivate path="/" component={PagesPromotionSearch} />
                </Switch>
            </StoreProvider>
        </Router>
    );
};

export default Root;