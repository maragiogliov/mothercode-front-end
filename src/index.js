import React from 'react';
import ReactDOM from 'react-dom';
import { IconContext } from 'react-icons';
import './index.scss';
import App from './App';

import { UserProvider } from './contexts/UserContext';

import ContextWrapper from './contexts/ContextWrapper';

ReactDOM.render(
    <IconContext.Provider
        value={{
            color: 'white',
            className: 'global-class-name',
            size: '30px',
        }}
    >
        <UserProvider>
            <React.StrictMode>
                <ContextWrapper>
                    <App />
                </ContextWrapper>
            </React.StrictMode>
        </UserProvider>
    </IconContext.Provider>,
    document.getElementById('root')
);
