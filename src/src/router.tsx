import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { App } from './scenes/App';

export const RouterApp: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <App></App>
                </Route>
            </Switch>
        </Router>
    );
};
