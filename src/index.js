import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import {Context} from "./context";
import ContactStore from "./store/ContactStore";
import LoadingStore from "./store/LoadingStore";

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        contact: new ContactStore(),
        loading: new LoadingStore()
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);

