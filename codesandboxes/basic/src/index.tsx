import 'core-js';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Redux } from './modules/redux';
import { App } from './App';

const rootElement = document.createElement('div');

document.body.appendChild(rootElement);

const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <Redux>
            <App />
        </Redux>
    </StrictMode>,
);
