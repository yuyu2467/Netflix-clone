import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./color-blind-theme.css";
import App from './app';
import {BrowserRouter} from 'react-router-dom';
import {UserProvider} from "./contexts/UserContext";
import { SettingsProvider } from './contexts/SettingsContext';



ReactDOM.render(<UserProvider>
                    <SettingsProvider>
                        <BrowserRouter>
                            <App/>
                        </BrowserRouter>
                    </SettingsProvider>
                </UserProvider>, document.getElementById("root"));

