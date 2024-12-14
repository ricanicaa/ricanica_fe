import "./App.css";
import { Router } from "./router";
import { Header } from "./components/Header";
import { useLocation } from "react-router-dom";

function App() {
    const location = useLocation();

    return (
        <div className="App">
            {location.pathname !== "/" && <Header />}
            <Router />
        </div>
    );
}

export default App;
