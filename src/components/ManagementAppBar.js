import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

export default function ManagementAppBar() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CRUD ops. using API React
          </Typography>
          <a
            href="/"
            style={{
              color: "white",
              borderRight: "1px solid white",
              paddingRight: "10px",
            }}
          >
            <HomeIcon />
          </a>
          <Button
            color="inherit"
            onClick={() =>
              navigate(`/studentAction`, {
                state: { isView: "false" },
              })
            }
          >
            Create Student
          </Button>
          <Button
            color="inherit"
            onClick={() =>
              navigate(`/TeacherAction`, {
                state: { isView: "false" },
              })
            }
          >
            Create Teacher
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
