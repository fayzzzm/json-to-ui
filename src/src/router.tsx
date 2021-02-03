import { App } from '@app/scenes/App';

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
