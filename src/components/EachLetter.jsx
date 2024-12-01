import { Typography } from "@mui/material";

export const EachLetter = ({ nickname, content }) => {
    return (
        <div>
            <Typography variant="h6">{nickname}</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
                {content}
            </Typography>
        </div>
    );
};
