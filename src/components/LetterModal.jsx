import { useEffect, useState } from "react";
import { Modal, Box } from "@mui/material";
import { EachLetter } from "./EachLetter";
import axios from "axios";

export const LetterModal = ({ open, letterId, onClose }) => {
  const [letter, setLetter] = useState(null);

  const API_BASE = import.meta.env.VITE_APP_API_BASE;

  // 편지 데이터를 가져오는 함수
  const fetchLetterById = async (id) => {
    try {
      const res = await axios.get(`${API_BASE}/api/letters/${id}`, {
        withCredentials: true,
      });
      console.log(res.data.data)
      if (res.status === 200) {
        setLetter(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch letter:", error);
    }
  };

  useEffect(() => {
    if (open && letterId) {
      fetchLetterById(letterId);
    } else {
      setLetter(null);
    }
  }, [open, letterId]);
  
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "8px",
          width: "400px",
        }}
      >
        {letter ? (
          <EachLetter
            nickname={letter[0].nickname}
            content={letter[0].content}
            date={letter[0].created_at}
            icon_type={letter[0].icon_type}
          />
        ) : (
          <div>Loading...</div>
        )}
      </Box>
    </Modal>
  );
};
