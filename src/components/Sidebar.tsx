import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Avatar, Box, Divider, drawerClasses, IconButton, Drawer as MuiDrawer, Stack, styled } from "@mui/material";
import logo from '../assets/image/logo.png';
import { useChatStore } from "../store/chatStore";

const drawerWidth = 60;
const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export const SideBar = () => {
  const { clearMessageList } = useChatStore();

  const handleClearChat = () => {
    console.log("Chat cleared");
    clearMessageList();
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: '',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
        }}
      >
        <img src={logo} alt="Logo" style={{ width: 40, height: 40 }} />
      </Box>
      <Divider />
      <Box
        sx={{
          overflow: 'auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <IconButton onClick={handleClearChat}>
          <AddCircleIcon fontSize="large" sx={{ color: 'black' }} />
        </IconButton>
      </Box>
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // borderTop: '1px solid',
          borderColor: 'divider',
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
  )
}