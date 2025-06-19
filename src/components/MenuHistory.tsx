import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useChatStore } from "../store/chatStore";
import { Typography } from "@mui/material";

type Props = {
  open: boolean;
};

export const MenuHistory = ({ open }: Props) => {
  const { clearMessageList, setThreadId } = useChatStore();

  const mainListItems = [
    {
      text: "New Chat",
      icon: <AddCircleIcon fontSize="medium" sx={{ color: "black" }} />,
    },
  ];

  const historyList = [
    { id: "1", title: "Chat with John", date: "2023-10-01" },
    { id: "2", title: "Project Discussion", date: "2023-10-02" },
    { id: "3", title: "Feedback Session", date: "2023-10-03" },
  ];

  const handleClearChat = () => {
    console.log("Chat cleared");
    clearMessageList();
    setThreadId();
  };

  // const handleSelectHistory = (item: type) => {
  //   console.log("Selected history:", item.id);
  //   setThreadId(item.id);
  // };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{ display: "block", paddingLeft: "0px !important" }}
            onClick={handleClearChat}
          >
            <ListItemButton sx={{ paddingLeft: open ? "0px !important" : 1.5 }}>
              <ListItemIcon sx={{ minWidth: "36px !important" }}>
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItemButton>
          </ListItem>
        ))}

        {open && (
          <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
            Recents
          </Typography>
        )}
        {open &&
          historyList.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ display: "block" }}>
              <ListItemButton
              // onClick={() => handleSelectHistory(item)}
              >
                <ListItemText
                  primary={
                    <Typography noWrap sx={{ maxWidth: 180 }}>
                      {item.title}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Stack>
  );
};
