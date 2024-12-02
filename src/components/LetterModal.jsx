import { Modal, Box } from "@mui/material";
import { EachLetter } from "./EachLetter";

export const LetterModal = ({ open, letter, onClose }) => {
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
                {letter && (
                    <EachLetter
                        nickname={letter.nickname}
                        content={letter.content}
                    />
                )}
            </Box>
        </Modal>
    );
};
