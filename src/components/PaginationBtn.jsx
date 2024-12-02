import { Stack, Pagination } from "@mui/material";

export const PaginationBtn = ({ totalPage, currentPage, onPageChange }) => {
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Stack spacing={2}>
                <Pagination
                    count={totalPage}
                    page={currentPage}
                    onChange={onPageChange}
                    color="primary"
                />
            </Stack>
        </div>
    );
};
