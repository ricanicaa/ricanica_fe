import PropTypes from "prop-types";
import "../styles/components/Dropdown.css";

export const Dropdown = ({ items, isOpen, onSelect }) => {
    const sortedItems = [...items].sort((a, b) =>
        a.english_name.localeCompare(b.english_name)
    );
    return (
        isOpen && (
            <div className="Dropdown">
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
        )
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
};
