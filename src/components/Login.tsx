// Login.tsx
import React, {useContext, useState} from "react";
import Progress from "./Loading";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import {AppContext, AppContextType} from "../App";
import {login} from "../services/logInService";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh", // Adjust this if needed
  },
});

const Login: React.FC = () => {
  const classes = useStyles();

  //  const {setIsLoggedIn, setToken, token} = useContext(
  const {setToken, token, setLoading, loading} = useContext(
    AppContext
  ) as AppContextType; // Use the context
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setToken(await login(email, password));
    setLoading(false);
    //    setIsLoggedIn(!!token);
  };

  const handleCreateProfile = (event: any) => {
    event.preventDefault();
    // Handle create profile logic here
    console.log("Creating profile with:", email, password);
  };
  return (
    <div className={classes.center}>
      {loading ? (
        <Progress />
      ) : (
        <Paper elevation={3} style={{padding: "20px", width: "300px"}}>
          <Typography variant="h4" gutterBottom>
            Zoomly
          </Typography>

          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  value="logIn"
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleLogin}
                >
                  Log In
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  value="newAccount"
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleCreateProfile}
                >
                  Create Account
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}
    </div>
  );
};

export default Login;
