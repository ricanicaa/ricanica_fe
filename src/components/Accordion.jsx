import "../styles/components/Accordion.css";
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { getMemberId } from "../util/member";
import axios from "axios";

export const Accordion = ({ items }) => {
    const API_BASE = import.meta.env.VITE_APP_API_BASE;
    const [activeIndex, setActiveIndex] = useState(null);
    const [answers, setAnswers] = useState(Array(items.length).fill(""));
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleAnswerChange = (index, value) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = value;
        setAnswers(updatedAnswers);
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleSubmit = async () => {
        try {
            const formattedAnswers = answers.reduce((result, name, index) => {
                const id = getMemberId(name);
                result[`question${index + 1}`] = id;
                return result;
            }, {});

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

    const isFormValid = answers.filter((answer) => answer !== "").length === 10;

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
                                    {index + 1}
                                </span>
                            ) : (
                                <span
                                    style={{
                                        color: "#bfbfbf",
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                    }}
                                >
                                    {index + 1}{" "}
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
                        style={{
                            display: activeIndex === index ? "block" : "none",
                            height: isDropdownOpen ? "200px" : "70px",
                            transition: "height 0.3s ease",
                        }}
                    >
                        {activeIndex === index && (
                            <div
                                className="SearchBar-container"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <SearchBar
                                    searchQuery={answers[index]}
                                    onSearchQueryChange={(value) =>
                                        handleAnswerChange(index, value)
                                    }
                                    isDropdownOpen={isDropdownOpen}
                                    onDropdownToggle={handleDropdownToggle}
                                />
                            </div>
                        )}
                    </div>
                </div>
            ))}
            <button
                onClick={handleSubmit}
                className="submit-button"
                disabled={!isFormValid}
                style={{
                    height: "50px",
                    border: "none",
                    borderRadius: "15px",
                    backgroundColor: isFormValid ? "#007bff" : "#d7d7d7",
                    cursor: isFormValid ? "pointer" : "not-allowed",
                    fontSize: "20px",
                    fontWeight: "bold",
                    letterSpacing: isFormValid ? "10px" : "2px",
                    color: isFormValid ? "#fff" : "#bfbfbf",
                    margin: "20px 0",
                }}
            >
                {isFormValid ? "완료띠예" : "KEEP GOING"}
            </button>
        </div>
    );
};
