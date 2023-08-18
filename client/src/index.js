import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink
} from "@apollo/client";

import { BrowserRouter } from 'react-router-dom'
import { setContext } from '@apollo/client/link/context';

const token = localStorage.getItem('jwt');

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: token || "" ,
        }
    }
});


const httpLink = new createHttpLink({
    uri: 'http://localhost:4000/'
});


const client = new ApolloClient({
    // uri: 'http://localhost:4000/',
    link:authLink.concat(httpLink),
    cache: new InMemoryCache()
});


const rootElement = document.getElementById('root');

createRoot(rootElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
