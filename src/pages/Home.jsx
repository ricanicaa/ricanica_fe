import { useState, useEffect } from "react";
import axios from "axios";
import { Tree } from "../components/Tree";
import { PaginationBtn } from "../components/PaginationBtn";
import { LetterModal } from "../components/LetterModal";
import { getNames } from "../util/member";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const Home = () => {
  const API_BASE = import.meta.env.VITE_APP_API_BASE;
  const [letters, setLetters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [open, setOpen] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const pageOwner = parseInt(sessionStorage.getItem("member_id"), 10);
  const memberName = getNames(pageOwner);
  const navigate = useNavigate();

  const isLogin = useAuth();

  useEffect(() => {
    if (isLogin) fetchInitialLetters();
  }, [isLogin]);

  if (!isLogin) navigate("/");

  const fetchInitialLetters = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/letters`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        setLetters(res.data.data);
        setTotalPage(res.data.totalPage);
      }
    } catch (error) {
      if (error.status == 401) {
        navigate("/");
      }
    }
  };

  const fetchLetters = async (page) => {
    try {
      const res = await axios.get(
        `${API_BASE}/api/letters?currentPage=${page}`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) setLetters(res.data.data);
    } catch (error) {
      if (error.status == 401) {
        navigate("/");
      }
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    fetchLetters(value);
  };

  const handleOpen = (letter) => {
    setSelectedLetter(letter);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedLetter(null);
  };

  return (
    <div className="Home">
      <h1 className="tree-title">{memberName} 님의 Tree</h1>
      <Tree letters={letters} onLetterClick={handleOpen} />
      <PaginationBtn
        totalPage={totalPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <LetterModal open={open} letter={selectedLetter} onClose={handleClose} />
    </div>
  );
};
