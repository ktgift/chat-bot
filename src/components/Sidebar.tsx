import {
  Avatar,
  Box,
  Divider,
  drawerClasses,
  IconButton,
  Drawer as MuiDrawer,
  Stack,
  styled,
} from "@mui/material";
import logo from "../assets/image/logo.png";
import { useChatStore } from "../store/chatStore";
import { useState } from "react";
import { MenuHistory } from "./MenuHistory";

const collapsedWidth = 60;
const expandedWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ open }) => ({
  width: open ? expandedWidth : collapsedWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  [`& .${drawerClasses.paper}`]: {
    width: open ? expandedWidth : collapsedWidth,
    transition: "width 0.3s",
    overflowX: "hidden",
  },
}));

export const SideBar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen((prev) => !prev);


  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "",
        },
      }}
      open={open}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: open ? "flex-start" : "center",
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
          p: 1.5,
        }}
      >
        <IconButton
          onClick={toggleDrawer}
        >
          <img src={logo} alt="Logo" style={{ width: 40, height: 40 }} />
        </IconButton>
      </Box>
      <Divider />
      <Box
        sx={{
          overflow: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MenuHistory />
      </Box>
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          justifyContent: "center",
          alignItems: "center",
          // borderTop: '1px solid',
          borderColor: "divider",
        }}
      >
        <Avatar
          sizes="small"
          alt="Kavisara"
          src="/static/images/avatar/7.jpg"
          sx={{ width: 32, height: 32 }}
        />
      </Stack>
    </Drawer>
  );
};
