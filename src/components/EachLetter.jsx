import { Typography } from "@mui/material";
import styles from "../styles/components/EachLetter.module.css";
import { getOrnamentsImage } from "../util/icon";

function formatCustomDate(isoDate) {
  const date = new Date(isoDate);
  const year = date.getFullYear().toString();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
}

export const EachLetter = ({ nickname, content, date, icon_type }) => {
  const iconPath = getOrnamentsImage(icon_type);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.nickname}>
          <img
            src={iconPath}
            className="ornament-image"
            style={{
              width: "50px",
              height: "50px",
            }}
          />
          {nickname}님
        </div>
        <div style={{ height: "20px" }}></div>
        <div className={styles.content}>{content}</div>
        <div style={{ height: "20px" }}></div>
      </div>
      <Typography variant="body2">{formatCustomDate(date)}</Typography>
    </div>
  );
};
