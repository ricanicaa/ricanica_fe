import { useState } from "react";
import { CreateLetter } from "../components/CreateLetter";
import { SearchBar } from "../components/SearchBar";

export const Letter = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchQueryChange = (query) => {
        setSearchQuery(query);
    };
    return (
        <div className="Letter">
            <h1>letter 페이지 입니다.</h1>
            <SearchBar
                searchQuery={searchQuery}
                onSearchQueryChange={handleSearchQueryChange}
            />
            <div style={{ height: "100px" }}></div>
            <CreateLetter searchQuery={searchQuery} />
        </div>
    );
};
