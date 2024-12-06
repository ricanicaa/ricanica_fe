import PropTypes from "prop-types";

export const Dropdown = ({ items, isOpen, onSelect }) => {
    const sortedItems = [...items].sort((a, b) =>
        a.english_name.localeCompare(b.english_name)
    );

    if (!isOpen) return null; // isOpen이 false일 때 아무것도 렌더링하지 않음

    return (
        <div className="Dropdown" style={{ width: "100%" }}>
            {sortedItems.map((item, index) => (
                <div
                    key={index}
                    className="Dropdown-Item"
                    onClick={() => onSelect(item)}
                >
                    {item.english_name}
                </div>
            ))}
        </div>
    );
};

// props의 타입 정의
Dropdown.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            english_name: PropTypes.string.isRequired,
        })
    ).isRequired,
    isOpen: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired, // onSelect prop이 함수임을 명시
};
