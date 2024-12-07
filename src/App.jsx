import "./App.css";
import { BrowserRouter } from "react-router-dom";

import { Router } from "./router";
import { Header } from "./components/Header";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Router />
            </div>
        </BrowserRouter>
    );
}

export default App;
