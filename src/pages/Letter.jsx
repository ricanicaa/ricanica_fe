import { useState } from "react";
import { CreateLetter } from "../components/CreateLetter";
import { SearchBar } from "../components/SearchBar";
import styles from "../styles/components/Letter.module.css";
import search from "../image/search.png";

export const Letter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };
  return (
    <div className={styles.letter}>
      <div className={styles.pageTitle}> 따뜻한 마음 전하기 </div>
      <div className={styles.searchContainer}>
        <div className={styles.title}>익명의 편지 전달함입니다!</div>
        <div className={styles.subTitle}>
          <div>모든 편지는 익명입니다! 그동안 하지 못했던 말,</div>
          <div>고마움의 표시 등 진심을 전해보세요! 🫶🏻🫶🏻🫶🏻</div>
          <div className={styles.caution}>하지만 상처는 주지 않도록!</div>
        </div>
        <SearchBar
          searchQuery={searchQuery}
          onSearchQueryChange={handleSearchQueryChange}
        />
      </div>
      <div style={{ height: "30px" }}></div>
      <CreateLetter searchQuery={searchQuery} />
      <div style={{ height: "30px" }}></div>
    </div>
  );
};
