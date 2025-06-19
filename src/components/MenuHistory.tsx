import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useChatStore } from '../store/chatStore';
import { Typography } from '@mui/material';


const mainListItems = [
  { text: 'New Chat', icon: <AddCircleIcon fontSize="large" sx={{ color: "black" }} /> },
];

export const MenuHistory = () => {
  const { clearMessageList, setThreadId } = useChatStore();

  const historyList = [
    { id: '1', title: 'Chat with John', date: '2023-10-01' },
    { id: '2', title: 'Project Discussion', date: '2023-10-02' },
    { id: '3', title: 'Feedback Session', date: '2023-10-03' },
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
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}

        {historyList.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
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
}
