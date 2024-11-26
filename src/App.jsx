import "./App.css";
import { BrowserRouter } from "react-router-dom";

import { Router } from "./router";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <h1>dd</h1>
                <Router />
            </div>
        </BrowserRouter>
    );
}

export default App;
