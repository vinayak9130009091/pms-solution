import React, { useState } from "react";
import { Box, Button, InputLabel, TextField, Grid, Container, Typography, List, ListItem, Divider, FormLabel, Link } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import img1 from "../Imgs/apple.png";
import img2 from "../Imgs/android.png";
import logo from "../Imgs/snplogo.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import user from "../Imgs/shilpa.jpg";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import axios from "axios";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

import { toast } from "react-toastify";

const ClientLogIn = () => {
  const USER_LOGIN_API = process.env.REACT_APP_USER_LOGIN;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  const handdleSignIn = () => {
    navigate("/home");
  };

  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  const setVal = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const loginuser = async (e) => {
    console.log(inpval);
    e.preventDefault();
    const { email, password } = inpval;
    const expiryTime = 8 * 60 * 60;
    if (!email) {
      toast.error("Email is required!");
      return;
    } else if (!email.includes("@")) {
      toast.error("Invalid email format!");
      return;
    }

    if (!password) {
      toast.error("Password is required!");
      return;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    try {
      const url = `${USER_LOGIN_API}/common/login/generatetoken/`;
      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          expiryTime,
        }),
      });

      const res = await data.json();
      console.log(res);

      if (res.status === 200) {
        localStorage.setItem("usersdatatoken", res.result.token);
        Cookies.set("userToken", res.result.token);
        navigate("/home");
        setInpval({ ...inpval, email: "", password: "" });

        Cookies.set("userToken", res.result.token);
      } else if (res.status === 400) {
        toast.error("Invalid email or password!");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      // console.error("Error:", error);
      // toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Container>
      <Box mt={4}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box>
              <img style={{ width: "110px", display: "block" }} src={logo} alt="" />
            </Box>

            <Box>
              <img style={{ width: "80px", display: "block", marginTop: 5, margin: 3, borderRadius: "50%" }} src={user} alt="" />
            </Box>

            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} marginTop={4}>
              <Typography fontSize={"0.8rem"}>SNP Tax & Financials has been in the tax business for over 6+ years. We have highly-professional tax experts available to address any personal/business tax filings. We offer the following services and more:</Typography>
              <List sx={{ fontSize: "0.8rem" }}>
                <ListItem>1. Individual / Business Tax Filing</ListItem>
                <ListItem>2. Entity Formation</ListItem>
                <ListItem>3. Bookkeeping & Payroll Services</ListItem>
                <ListItem>4. Strategic Tax Planning</ListItem>
                <ListItem>5. ITIN Preparation</ListItem>
                <ListItem>6. FBAR/FATCA & Representation</ListItem>
                <ListItem>7. IRS Amnesty Programs</ListItem>
                <ListItem>8. Notice Representation</ListItem>
                <ListItem>9. PAN Card & India Tax Services</ListItem>
                <ListItem>10. Financial Planning</ListItem>
              </List>
            </Box>

            <Box display={"flex"} gap={5} ml={2} mt={2}>
              <FacebookIcon />
              <InstagramIcon />
            </Box>

            <Box mt={2}>
              <Divider />
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box borderLeft={"1px solid #C0C0C0"} p={3} height={"85vh"} display="flex" justifyContent="center" alignItems="center" mt={6}>
              <Box width="100%" maxWidth="400px">
                <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
                  Sign In
                </Typography>

                <Box>
                  <InputLabel sx={{ color: "black", mt: 2 }}>Email</InputLabel>
                  <TextField fullWidth name="email" placeholder="Enter Your Email" size="large" sx={{ mt: 2 }} value={inpval.email} onChange={setVal} id="email" />
                </Box>

                <Box mt={3}>
                  <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      name="password"
                      value={inpval.password}
                      onChange={setVal}
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} onMouseUp={handleMouseUpPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Box>

                <Box mt={1}>
                  <Typography fontWeight={"bold"} color="#439cea">
                    <Link component={NavLink} to="/forgotpass" sx={{ color: "cornflowerblue", textDecoration: "none" }}>
                      Forgot Password?
                    </Link>
                  </Typography>
                </Box>

                <Box onClick={loginuser} mt={3} textAlign="center">
                  <Button sx={{ padding: "15px", borderRadius: "15px" }} variant="contained" color="primary" fullWidth>
                    <Typography fontWeight={"bold"}>Sign In</Typography>
                  </Button>
                </Box>

                <Box borderBottom={"1px solid #627181"}>
                  <p style={{ textAlign: "center", paddingBottom: "30px", paddingTop: "15px" }}>
                    Don't have a client portal account?{" "}
                    <a href="/signup" style={{ color: "#439cea", fontWeight: "bold" }}>
                      Sign up
                    </a>
                  </p>
                </Box>

                <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: 0, padding: 0 }}>
                  <Box style={{ display: "flex", alignItems: "center", margin: 0, padding: 0 }}>
                    <Box className="playstore" style={{ margin: 0, padding: 0 }}>
                      <NavLink to="https://play.google.com/store/apps/details?id=com.linkedin.android&hl=en_IN&gl=US">
                        <img style={{ width: "180px", display: "block" }} src={img1} alt="Play Store" />
                      </NavLink>
                    </Box>
                    <Box className="appstore" style={{ marginLeft: "16px", margin: 0, padding: 0 }}>
                      <NavLink to="https://apps.apple.com/us/app/linkedin-network-job-finder/id288429040">
                        <img style={{ width: "180px", display: "block" }} src={img2} alt="App Store" />
                      </NavLink>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </Box>
    </Container>
  );
};

export default ClientLogIn;
