import "../styles/components/SearchBar.css";
import { useState } from "react";
import { Dropdown } from "./Dropdown";
import { names } from "../data/names";
import { FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

export const SearchBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setIsOpen(true);
    };

    const handleSearchSubmit = () => {
        // 검색 버튼 클릭 시, 필터된 항목이 하나일 경우 자동으로 선택
        if (filteredItems.length === 1) {
            const firstItem = filteredItems[0];
            setSelectedItem(firstItem);
            setSearchQuery(firstItem.english_name);
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    };

    const handleSelectItem = (item) => {
        setSelectedItem(item);
        setSearchQuery(item.english_name);
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
            setSearchQuery(firstItem.english_name);
            setIsOpen(false);
        }
    };

    const handleClearSelection = () => {
        setSelectedItem(null);
        setSearchQuery("");
    };

    const showDropdown = filteredItems.length > 0;

    return (
        <div className="SearchBar">
            <div className="Search-Box-Container">
                <input
                    className="Search-Box"
                    type="text"
                    value={searchQuery} // 입력값을 searchQuery로 설정
                    onChange={handleSearchChange} // 입력 값 변경 시 실행
                    onKeyDown={handleKeyDown} // Enter 키 눌렀을 때 처리
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
                        <div>{selectedItem.english_name}</div>
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
            <button className="Search-Button" onClick={handleSearchSubmit}>
                검색
            </button>
        </div>
    );
};
