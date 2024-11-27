import "../styles/components/Accordion.css";
import { useState } from "react";

const Accordion = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="Accordion">
            {items.map((item, index) => (
                <div key={index} className="Accordion-item">
                    <div
                        onClick={() => toggle(index)}
                        style={{ cursor: "pointer", fontWeight: "bold" }}
                    >
                        {item.title}
                    </div>
                    {activeIndex === index && (
                        <div className="Accordion-content">{item.content}</div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Accordion;

// 사용 예시
// <Accordion items={[{ title: "Title 1", content: "Content 1" }, { title: "Title 2", content: "Content 2" }]} />
