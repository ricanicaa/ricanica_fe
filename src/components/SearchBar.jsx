import "../styles/components/SearchBar.css";
import { useState } from "react";
import { Dropdown } from "./Dropdown";
import { names } from "../data/names";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

export const SearchBar = ({ searchQuery, onSearchQueryChange }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSearchChange = (event) => {
        onSearchQueryChange(event.target.value);
        setIsOpen(true);
    };

    const handleSearchSubmit = () => {
        // 검색 버튼 클릭 시, 필터된 항목이 하나일 경우 자동으로 선택
        if (filteredItems.length === 1) {
            const firstItem = filteredItems[0];
            setSelectedItem(firstItem);
            onSearchQueryChange(firstItem.english_name);
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    };

    const handleSelectItem = (item) => {
        setSelectedItem(item);
        onSearchQueryChange(item.english_name);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const filteredItems = names.filter((item) =>
        item.english_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && filteredItems.length === 1) {
            const firstItem = filteredItems[0];
            setSelectedItem(firstItem);
            onSearchQueryChange(firstItem.english_name);
            setIsOpen(false);
        }
    };

    const handleClearSelection = () => {
        setSelectedItem(null);
        onSearchQueryChange("");
        setIsOpen(true);
    };

    const showDropdown = filteredItems.length > 0;

    return (
        <div className="SearchBar">
            <div className="Search-Box-Container">
                <input
                    className="Search-Box"
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    placeholder="검색"
                />
                {isOpen ? (
                    <FaChevronUp
                        className="Search-Box-Icon"
                        onClick={toggleDropdown}
                    />
                ) : (
                    <FaChevronDown
                        className="Search-Box-Icon"
                        onClick={toggleDropdown}
                    />
                )}
                {selectedItem && (
                    <div className="Selected-Item">
                        <div style={{ display: "flex", alignItems: "center" }}>
                            {selectedItem.english_name}
                        </div>
                        <button onClick={handleClearSelection}>
                            <AiOutlineClose size={14} />
                        </button>
                    </div>
                )}
            </div>
            {showDropdown && (
                <Dropdown
                    items={filteredItems}
                    isOpen={isOpen}
                    onSelect={handleSelectItem}
                />
            )}
            {/* <button className="Search-Button" onClick={handleSearchSubmit}>
                검색
            </button> */}
        </div>
    );
};
