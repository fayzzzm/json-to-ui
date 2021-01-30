import React from 'react';
import ReactDOM from 'react-dom';
import { RouterApp } from './router';

const App: React.FC = () => {
    return (
            <RouterApp />
    );
};

ReactDOM.render(<App />, document.getElementById('root'));