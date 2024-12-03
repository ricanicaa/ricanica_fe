import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setIsMenuOpen(open);
    };

    return (
        <div style={{ position: "relative" }}> {/* App 내부에서 상대 위치 */}
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleMenu(true)}
                sx={{ position: "absolute", top: 10, right: 10 }}
            >
                <MenuIcon />
            </IconButton>

            <Drawer
                anchor="right"
                open={isMenuOpen}
                onClose={toggleMenu(false)}
                PaperProps={{
                    sx: { width: "200px", margin: "0 auto", maxWidth: "calc(100% - 40px)" },
                }}
            >
                <div
                    role="presentation"
                    onClick={toggleMenu(false)}
                    onKeyDown={toggleMenu(false)}
                >
                    <List>
                    <ListItem button component={Link} to="/home">
                            <ListItemText primary="홈으로 가기" />
                        </ListItem>
                        <ListItem button component={Link} to="/vote">
                            <ListItemText primary="투표하러 가기" />
                        </ListItem>
                        <ListItem button component={Link} to="/letter">
                            <ListItemText primary="편지쓰러 가기" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </div>
    );
};
