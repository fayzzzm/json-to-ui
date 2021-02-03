import { RouterApp } from '@app/router';

import React from 'react';
import ReactDOM from 'react-dom';

const App: React.FC = () => {
    return <RouterApp />;
};

ReactDOM.render(<App />, document.getElementById('root'));
