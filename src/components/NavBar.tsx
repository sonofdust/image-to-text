import React, {useState, useContext} from "react";
import {login} from "../services/logInService";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import {AppContext, AppContextType} from "../App";
import {LocalLaundryService} from "@material-ui/icons";

const NavBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  //  const {token, setToken, setIsLoggedIn} = useContext(
  const {token, setToken, setLoading} = useContext(
    AppContext
  ) as AppContextType; // Use the context

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // const handleLogin = async () => {
  //   setToken(await login(email, password));
  //   handleMenuClose();
  // };

  const handleLogout = () => {
    // Removed onLogout();
    //    console.log("Logging out");
    localStorage.removeItem("AUTH_KEY");
    //    console.log("STORAGE: ", localStorage.getItem("AUTH_KEY"));
    setToken(null);
    //    setIsLoggedIn(false);
    setLoading(false);

    handleMenuClose();
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" style={{flexGrow: 1}}>
          ZOOMLY
        </Typography>
        {/* {token ? ( */}
        <>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
