import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>

                <Toaster
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: "#18181b",
                            color: "#fff",
                        },
                    }}
                />

                <App />

            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);