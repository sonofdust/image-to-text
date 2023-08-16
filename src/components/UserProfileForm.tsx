import React, {useState, useContext} from "react";
import {Button, TextField, Grid, Paper, Typography} from "@material-ui/core";
import {AppContext, AppContextType} from "../App";

// interface UserProfileFormProps {
//   onSubmit: (email: string, password: string) => void;
// }

const UserProfileForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verifyPassword, setVerifyPassword] = useState<string>("");
  const [passwordMismatch, setPasswordMismatch] = useState<boolean>(true);
  const [emailError, setEmailError] = useState<string>("");
  const {token, setToken, setLoading} = useContext(
    AppContext
  ) as AppContextType; // Use the context

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(newEmail)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    // Check for password mismatch
    setPasswordMismatch(newPassword !== verifyPassword);
  };

  const handleVerifyPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newVerifyPassword = event.target.value;
    setVerifyPassword(newVerifyPassword);
    // Check for password mismatch
    setPasswordMismatch(password !== newVerifyPassword);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password === verifyPassword && emailError === "") {
      //      onSubmit(email, password);
    } else {
      // Handle password mismatch or email validation error
      console.log("Form submission failed");
    }
  };

  return (
    <Paper elevation={3} style={{padding: "20px", width: "300px"}}>
      <Typography variant="h6" gutterBottom>
        Create User Profile
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={handleEmailChange}
              error={emailError !== ""}
              helperText={emailError}
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
              error={passwordMismatch}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Verify Password"
              variant="outlined"
              type="password"
              fullWidth
              value={verifyPassword}
              onChange={handleVerifyPasswordChange}
              error={passwordMismatch}
              helperText={passwordMismatch ? "Passwords do not match" : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={passwordMismatch || emailError !== ""}
            >
              Create Profile
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default UserProfileForm;
