import { useState, useEffect } from "react";
import { getOrnamentsImage } from "../util/icon";
import { generateRandomNickname, generateRandomIconType } from "../util/icon";
import tree from "../image/tree.png";
import axios from "axios";
import { Stack, Pagination, Modal, Box } from "@mui/material";
import { EachLetter } from "../components/EachLetter";

const positions = [
    { transform: "translate(-40%, -400%)" },
    { transform: "translate(-110%, -240%)" },
    { transform: "translate(40%, -280%)" },
    { transform: "translate(-190%, -120%)" },
    { transform: "translate(-40%, -130%)" },
    { transform: "translate(120%, -100%)" },
    { transform: "translate(-100%, 0%)" },
    { transform: "translate(20%, 60%)" },
    { transform: "translate(-180%, 120%)" },
    { transform: "translate(150%, 120%)" },
];

export const Home = () => {
    const API_BASE = import.meta.env.VITE_APP_API_BASE;
    const [letters, setLetters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedLetter, setSelectedLetter] = useState(null);
    const [open, setOpen] = useState(false);

    const itemsPerPage = 10;

    // 목데이터 생성
    useEffect(() => {
        const mockData = Array.from({ length: 55 }, (_, index) => ({
            nickname: generateRandomNickname(),
            icon_type: generateRandomIconType(),
            content: `편지 내용 ${index + 1}`,
            letter_id: index,
        }));
        setLetters(mockData);
    }, []);

    // 현재 페이지에 해당하는 데이터
    const paginatedLetters = letters.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // 페이지 편경 핸들러
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // 편지 열기 닫기
    const handleOpen = (letter) => {
        setSelectedLetter(letter);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedLetter(null);
    };

    // 편지 리스트 가지고 오기
    // const fetchLetters = async (page) =>{
    //     try{
    //         const endPoint = `${API_BASE}/letters?cursor=${nextCursor}`
    //         const res = await axios.get(endPoint, {

    //         })
    //     }
    // }

    // const handleNext = () => {

    // }

    // const handlePrev = () => {
    //     setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    // }

    return (
        <div className="Home">
            <h1 className="tree-title">Erica 님의 tree</h1>
            <div className="hamburger-bar"></div>
            <div
                className="tree"
                style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <img src={tree} alt="Tree" />
                {paginatedLetters.map((letter, index) => {
                    const position = positions[index % positions.length];
                    const iconPath = getOrnamentsImage(letter.icon_type);

                    return (
                        <div
                            key={letter.letter_id}
                            style={{
                                ...position,
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                width: "70px",
                                height: "70px",
                                textAlign: "center",
                            }}
                            onClick={() => handleOpen(letter)}
                        >
                            {iconPath && (
                                <img
                                    src={iconPath}
                                    alt={`장식 ${index + 1}`}
                                    className="ornament-image"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        margin: "auto",
                                    }}
                                />
                            )}
                            <div
                                className="ornament-text"
                                style={{
                                    color: "white",
                                    textShadow:
                                        " -2px 0px black, 0px 2px black, 2px 0px black, 0px -2px black",
                                }}
                            >
                                {letter.nickname}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Stack spacing={2}>
                    <Pagination
                        count={Math.ceil(letters.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Stack>
            </div>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: "8px",
                        width: "400px",
                    }}
                >
                    {selectedLetter && (
                        <EachLetter
                            nickname={selectedLetter.nickname}
                            content={selectedLetter.content}
                        />
                    )}
                </Box>
            </Modal>
        </div>
    );
};
