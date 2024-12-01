import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Splash } from "./pages/Splash";
import { Letter } from "./pages/Letter";
import { Vote } from "./pages/Vote";
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
