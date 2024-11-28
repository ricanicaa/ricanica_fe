import "../styles/components/Accordion.css";
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";

export const Accordion = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
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
                        {/* 열리면 title + content가 표시되게 */}
                        {activeIndex === index
                            ? `${item.title} ${item.content}`
                            : item.title}
                    </div>
                    <div
                        className={`Accordion-content ${
                            activeIndex === index ? "active" : ""
                        }`}
                    >
                        {activeIndex === index && (
                            <SearchBar
                                searchQuery={item.searchQuery || ""}
                                onSearchQueryChange={(value) => {
                                    item.searchQuery = value;
                                }}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
