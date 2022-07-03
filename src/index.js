import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const root = ReactDOM.createRoot(document.getElementById("root"));
// chreating queryClinet for cashing data
const queryClinet = new QueryClient();

root.render(
  <QueryClientProvider client={queryClinet}>
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  </QueryClientProvider>
);
