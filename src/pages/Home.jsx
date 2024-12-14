import { useState, useEffect, memo } from "react";
import axios from "axios";
import { Tree } from "../components/Tree";
import { PaginationBtn } from "../components/PaginationBtn";
import { LetterModal } from "../components/LetterModal";
import { getNames } from "../util/member";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Snowflakes from "../components/Snowflakes";

// Snowflakes 컴포넌트를 memo로 감싸서 리렌더링 방지
const SnowflakesBackground = memo(() => (
    <>
        <Snowflakes count={30} speedRange={[20, 45]} />
        <Snowflakes count={30} speedRange={[40, 55]} />
    </>
));

export const Home = () => {
    const API_BASE = import.meta.env.VITE_APP_API_BASE;
    const [letters, setLetters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedLetter, setSelectedLetter] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedLetterId, setSelectedLetterId] = useState(null);
    const [totalPage, setTotalPage] = useState(1);
    const pageOwner = parseInt(sessionStorage.getItem("member_id"), 10);
    const memberName = getNames(pageOwner);
    const navigate = useNavigate();

    const isLogin = useAuth();

    useEffect(() => {
        if (isLogin) fetchInitialLetters();
    }, [isLogin]);

    const fetchInitialLetters = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/letters`, {
                withCredentials: true,
            });

            if (res.status === 200) {
                setLetters(res.data.data);
                setTotalPage(res.data.totalPage);
            }
        } catch (error) {
            if (error.status == 401) {
                navigate("/");
            }
        }
    };

    const fetchLetters = async (page) => {
        try {
            const res = await axios.get(
                `${API_BASE}/api/letters?currentPage=${page}`,
                {
                    withCredentials: true,
                }
            );
            if (res.status === 200) setLetters(res.data.data);
        } catch (error) {
            if (error.status == 401) {
                navigate("/");
            }
        }
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        fetchLetters(value);
    };

    const handleOpen = (letter) => {
        setSelectedLetterId(letter.letter_id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedLetterId(null);
    };

    return (
        <>
            {/* SnowflakesBackground는 상태 변화와 분리 */}
            <SnowflakesBackground />
            <div
                className="Home"
                style={{
                    backgroundColor: "#090E28",
                    padding: "28px",
                    height: "100vh",
                }}
            >
                <h1
                    className="tree-title"
                    style={{ color: "white", marginLeft: "30px" }}
                >
                    {memberName} 님의 Tree
                </h1>
                <Tree letters={letters} onLetterClick={handleOpen} />
                <PaginationBtn
                    totalPage={totalPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
                {/* <LetterModal
                    open={open}
                    letterId={selectedLetterId}
                    onClose={handleClose}
                /> */}
            </div>
        </>
    );
};
