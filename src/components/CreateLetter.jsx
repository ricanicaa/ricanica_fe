import "../styles/components/CreateLetter.css";
import { names } from "../data/names";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdSend } from "react-icons/io";
import { getRandomNumber } from "../util/icon";

export const CreateLetter = ({ searchQuery }) => {
    const API_BASE = import.meta.env.VITE_APP_API_BASE;
    const [memberId, setMemberId] = useState(null);
    const [name, setName] = useState(null);
    const [content, setContent] = useState("");
    const [sender, setSender] = useState("");
    const [isContentValid, setIsContentValid] = useState(false);
    const [isSenderValid, setIsSenderValid] = useState(false);

    // 이름 매칭
    useEffect(() => {
        if (!searchQuery) {
            setName(null);
            setMemberId(null);
            return;
        }

        const matchedName = names.find(
            (item) => item.english_name === searchQuery
        );

        if (matchedName) {
            setName(matchedName.name);
            setMemberId(matchedName.member_id);
        } else {
            console.log("일치하는 이름이 없습니다.");
        }
    }, [searchQuery]);

    // 유효성 검사
    const validateContent = () => {
        setIsContentValid(content.length >= 50);
    };

    const validateSender = () => {
        setIsSenderValid(sender.length > 0 && sender.length <= 5);
    };

    const isValid = isContentValid && isSenderValid;

    // 폼제출
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                `${API_BASE}/api/letters`,
                {
                    content,
                    nickname: sender,
                    member_id: memberId,
                    icon_type: getRandomNumber(),
                },
                {
                    withCredentials: true,
                }
            );

            if (res.status === 201) {
                console.log("제출 성공 : ", res.data);
            } else {
                console.log("제출 실패");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="CreateLetter">
            <form className="LetterForm" onSubmit={handleSubmit}>
                <div className="To">
                    <strong>💌 To. {name}</strong>
                </div>

                <div className="FormField">
                    <textarea
                        id="content"
                        placeholder="마음을 전해보아요 ... 🤍"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onBlur={validateContent}
                    />
                    <div className="char-count">{content.length} 자</div>
                    {!isContentValid && (
                        <div className="helper-text">
                            내용은 최소 50자 이상이어야 합니다.
                        </div>
                    )}
                </div>
                <div className="FormField">
                    <label htmlFor="sender">
                        <strong>✉️ From.</strong>{" "}
                    </label>

                    <input
                        id="sender"
                        type="text"
                        placeholder="나만의 닉네임을 지어보아용 (최대 5글자)"
                        value={sender}
                        onChange={(e) => setSender(e.target.value)}
                        onBlur={validateSender}
                    />
                    {!isSenderValid && sender.length > 5 && (
                        <div className="helper-text">
                            닉네임은 최대 5글자까지 가능합니다.
                        </div>
                    )}
                    {!isSenderValid && sender.length === 0 && (
                        <div className="helper-text">
                            보내는 사람을 입력해주세요.
                        </div>
                    )}
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <button
                        type="submit"
                        className={`SubmitButton ${
                            isValid ? "active" : "disabled"
                        }`}
                        disabled={!isValid}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >
                        <IoMdSend size={18} />
                        <div style={{ fontSize: "14px" }}>보내기</div>
                    </button>
                </div>
            </form>
        </div>
    );
};
