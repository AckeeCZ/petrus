import 'core-js';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Redux } from './modules/redux';
import { App } from './App';

const rootElement = document.createElement('div');

document.body.appendChild(rootElement);

const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <Redux>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Redux>
    </StrictMode>,
);
