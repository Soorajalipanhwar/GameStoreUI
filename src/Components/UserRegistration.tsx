import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Alert,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

// Custom Styled Button
const StyledButton = styled(Button)({
  borderRadius: "25px",
  padding: "10px 20px",
  fontSize: "16px",
  textTransform: "none",
  fontWeight: "bold",
  transition: "all 0.3s ease-in-out",
  "&.MuiButton-containedPrimary": {
    background: "linear-gradient(45deg, #1a73e8, #4285f4)",
    color: "#fff",
    "&:hover": {
      background: "linear-gradient(45deg, #0c47a1, #0c57c5)",
    },
  },
});

interface User {
  name: string;
  email: string;
  password: string;
}

const UserRegistration: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [loginError, setLoginError] = useState<string>("");
  const navigate = useNavigate(); // ✅ Initialize navigation hook

  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
    setEmailError("");
    setPasswordError("");
    setLoginError("");
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    if (users.some((user) => user.email === email)) {
      setEmailError("This email is already registered.");
      return;
    }

    const newUser: User = { name, email, password };
    setUsers([...users, newUser]);
    alert("Registration successful! Please log in.");
    setTabIndex(0);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setLoggedInUser(user);
      setLoginError("");
      navigate("/management"); // ✅ Correct path
    } else {
      setLoginError("Invalid email or password.");
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {loggedInUser ? (
          <Box textAlign="center">
            <Typography variant="h4" gutterBottom>
              Welcome, {loggedInUser.name}!
            </Typography>
            <Typography variant="body1">You are now logged in.</Typography>
            <StyledButton
              variant="contained"
              color="primary"
              onClick={handleLogout}
              sx={{ mt: 3 }}
            >
              Logout
            </StyledButton>
          </Box>
        ) : (
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              width: "100%",
              textAlign: "center",
              borderRadius: "12px",
            }}
          >
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered
              sx={{
                "& .MuiTabs-flexContainer": {
                  justifyContent: "space-evenly",
                },
                "& .MuiTab-root": {
                  fontSize: "16px",
                  fontWeight: "bold",
                  textTransform: "none",
                },
              }}
            >
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>

            {tabIndex === 0 && (
              <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Sign in to your account
                </Typography>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {loginError && <Alert severity="error">{loginError}</Alert>}
                <StyledButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </StyledButton>
              </Box>
            )}

            {tabIndex === 1 && (
              <Box component="form" onSubmit={handleRegister} sx={{ mt: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Create a new account
                </Typography>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!emailError}
                  helperText={emailError}
                  required
                />
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!passwordError}
                  helperText={passwordError}
                  required
                />
                <StyledButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </StyledButton>
              </Box>
            )}
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default UserRegistration;
