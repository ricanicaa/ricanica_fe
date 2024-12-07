import "./App.css";
import { BrowserRouter } from "react-router-dom";

import { Router } from "./router";
import { Header } from "./components/Header";

function App() {
    const isHomePage = location.pathname === "/home";
    return (
        <BrowserRouter>
            <div className={`App ${isHomePage ? "home-page" : ""}`}>
                <Header />
                <Router />
            </div>
        </BrowserRouter>
    );
}

export default App;
