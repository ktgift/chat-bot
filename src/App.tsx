import { Box } from "@mui/material";
import { ChatInterface } from "./components/ChatInterface";
import { SideBar } from "./components/Sidebar";

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: "auto",
          height: "100vh",
        }}
      >
        <ChatInterface />
      </Box>
    </Box>
  );
}

export default App;
