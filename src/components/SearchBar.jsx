import "../styles/components/SearchBar.css";
import { useState } from "react";
import { Dropdown } from "./Dropdown";
import { names } from "../data/names";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

export const SearchBar = ({
    searchQuery,
    onSearchQueryChange,
    isDropdownOpen,
    onDropdownToggle,
}) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        onSearchQueryChange(value); // 검색어 업데이트
        setSelectedItem(null); // 검색어를 변경하면 선택된 항목 초기화

        // 필터된 항목이 있으면 드롭다운 열고, 없으면 닫기
        const shouldOpenDropdown = filteredItems.length > 0;
        if (shouldOpenDropdown !== isDropdownOpen) {
            onDropdownToggle(); // 드롭다운 열기/닫기 상태 변경
        }
    };

    const handleSelectItem = (item) => {
        setSelectedItem(item);
        onSearchQueryChange(item.english_name); // 선택한 아이템으로 검색어 업데이트
        onDropdownToggle(); // 드롭다운 닫기
    };

    const filteredItems = names.filter((item) =>
        item.english_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && filteredItems.length === 1) {
            const firstItem = filteredItems[0];
            setSelectedItem(firstItem);
            onSearchQueryChange(firstItem.english_name);
            onDropdownToggle(); // 드롭다운 닫기
        }
    };

    const handleClearSelection = () => {
        setSelectedItem(null);
        onSearchQueryChange(""); // 선택된 항목 초기화
    };

    const showDropdown = filteredItems.length > 0;

    return (
        <div className="SearchBar">
            <div className="Search-Box-Container">
                <input
                    className="Search-Box"
                    type="text"
                    value={
                        selectedItem ? selectedItem.english_name : searchQuery
                    } // 선택된 항목 있으면 그 값, 없으면 searchQuery
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    placeholder="검색"
                    style={{ paddingLeft: "20px" }}
                />
                {isDropdownOpen ? (
                    <FaChevronUp
                        className="Search-Box-Icon"
                        onClick={onDropdownToggle}
                    />
                ) : (
                    <FaChevronDown
                        className="Search-Box-Icon"
                        onClick={onDropdownToggle}
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
            {showDropdown && isDropdownOpen && (
                <Dropdown
                    items={filteredItems}
                    onSelect={handleSelectItem}
                    isOpen={isDropdownOpen}
                />
            )}
        </div>
    );
};
