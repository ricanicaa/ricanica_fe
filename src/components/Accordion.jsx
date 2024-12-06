import "../styles/components/Accordion.css";
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { getMemberId } from "../util/member";
import axios from "axios";

export const Accordion = ({ items }) => {
    const API_BASE = import.meta.env.VITE_APP_API_BASE;
    const [activeIndex, setActiveIndex] = useState(null);
    const [answers, setAnswers] = useState(Array(items.length).fill(""));

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleAnswerChange = (index, value) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = value;
        setAnswers(updatedAnswers);
        if (value) {
            setActiveIndex(null);
        }
    };

    const handleSubmit = async () => {
        try {
            const formattedAnswers = answers.reduce((result, name, index) => {
                const id = getMemberId(name);
                result[`question${index + 1}`] = id;
                return result;
            }, {});

            console.log("Submitted Answers:", formattedAnswers);

            const res = await axios.post(
                `${API_BASE}/api/votes`,
                formattedAnswers,
                { withCredentials: true }
            );

            if (res.status === 200) {
                alert("설문조사 완료");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="Accordion">
            {items.map((item, index) => (
                <div className="question" key={index}>
                    <div
                        className={`Accordion-item ${
                            activeIndex === index ? "active" : ""
                        }`}
                        onClick={() => toggle(index)}
                        style={{
                            cursor: "pointer",
                            fontWeight: "bold",
                            borderRadius:
                                activeIndex === index
                                    ? "15px 15px 0 0"
                                    : "15px",
                        }}
                    >
                        <div
                            style={{
                                border: "none",
                                width: "30px",
                                height: "30px",
                                marginRight: "20px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "50%",
                                backgroundColor: answers[index]
                                    ? "#007bff"
                                    : "#d7d7d7",
                            }}
                        >
                            {answers[index] ? (
                                <span
                                    style={{
                                        color: "white",
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                    }}
                                >
                                    {index + 1} {/* 1부터 10까지 표시 */}
                                </span>
                            ) : (
                                <span
                                    style={{
                                        color: "#bfbfbf", // 답변이 없으면 회색
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                    }}
                                >
                                    {index + 1}{" "}
                                    {/* 답변이 없으면 회색으로 숫자 표시 */}
                                </span>
                            )}
                        </div>
                        {item.title}
                        {activeIndex === index && ` ${item.content}`}
                    </div>
                    <div
                        className={`Accordion-content ${
                            activeIndex === index ? "active" : ""
                        }`}
                    >
                        {activeIndex === index && (
                            <div className="SearchBar-container">
                                <SearchBar
                                    searchQuery={answers[index]} // 각 질문에 연결된 답변
                                    onSearchQueryChange={(value) =>
                                        handleAnswerChange(index, value)
                                    }
                                />
                            </div>
                        )}
                    </div>
                </div>
            ))}
            <button onClick={handleSubmit} className="submit-button">
                Submit All Answers
            </button>
        </div>
    );
};
