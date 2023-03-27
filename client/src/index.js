import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./features/store";
import 'bootstrap/dist/css/bootstrap.css'
import {PersistGate} from "redux-persist/integration/react"
import {persistStore} from "redux-persist"
import {GoogleOAuthProvider} from '@react-oauth/google'
 let persistor=persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="178073120610-37o8quh3tv2n44i41q06apg04gk7mvag.apps.googleusercontent.com">
     <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider></GoogleOAuthProvider>
  </React.StrictMode>
);
