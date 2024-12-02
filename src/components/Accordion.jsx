import "../styles/components/Accordion.css";
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";

export const Accordion = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [answers, setAnswers] = useState(Array(items.length).fill("")); // 9개의 답변 관리

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleAnswerChange = (index, value) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = value; // 특정 질문의 답변 업데이트
        setAnswers(updatedAnswers);
    };

    const handleSubmit = () => {
        // 9개의 답변을 한 번에 제출
        console.log("Submitted Answers:", answers);
        alert("Answers submitted successfully!");
        // 서버로 전송 로직 추가 가능 (fetch/axios 등 사용)
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
                        {item.title}
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
