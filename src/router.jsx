import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Splash } from "./pages/splash";
import { Letter } from "./pages/letter";
import { Vote } from "./pages/vote";

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/home" element={<Home />} />
            <Route path="/letter" element={<Letter />} />
            <Route path="/vote" element={<Vote />} />
        </Routes>
    );
};
