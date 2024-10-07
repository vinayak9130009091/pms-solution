import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import micropms from "../Imgs/micropms.png";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import OtpInput from "react-otp-input";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import { InputLabel, TextField, Button, Checkbox, FormControlLabel, Typography, Container, Paper, Box } from "@mui/material";
const ClientSignup = () => {
  const USER_LOGIN_API = process.env.REACT_APP_USER_LOGIN;
  //todo ========    #page control  logic   No1 =======
  const [currentStep, setCurrentStep] = useState(1);
  const nextStep = () => setCurrentStep(currentStep + 1);

  const [inpval, setInpval] = useState({
    email: "",
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
  //*checkbox
  const [isChecked, setIsChecked] = useState(false);
  const setValbox = (event) => {
    setIsChecked(event.target.checked);
  };

  // Create account handler
  const createAccount = async (e) => {
    e.preventDefault();
    const { email } = inpval;

    if (email === "") {
      toast.error("email is required!", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.warning("includes @ in your email!", {
        position: "top-center",
      });
    } else if (isChecked === false) {
      toast.error("Accept terms and condtion ", {
        position: "top-center",
      });
    } else {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const email = inpval.email;

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      // Fetch URL with environment variable
      const url = `${USER_LOGIN_API}/common/user/email/getuserbyemail/`;
      console.log(url);
      fetch(url + email, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((result) => {
          // Assuming result is in JSON format and contains user data
          if (result.user.length > 0) {
            toast.error("User with this EMail already exists", { position: "top-right" });
            // You can also do further processing here if needed
          } else {
            e.preventDefault();

            let data = JSON.stringify({
              email: inpval.email,
            });
            // Fetch URL with environment variable
            const url = `${USER_LOGIN_API}/clientrequest-otp/`;
            let config = {
              method: "post",
              maxBodyLength: Infinity,
              url: url,
              headers: {
                "Content-Type": "application/json",
              },
              data: data,
            };
            axios
              .request(config)
              .then((response) => {
                console.log(JSON.stringify(response.data));

                alert("Check your email ID for OTP");
                //   setInpval({ ...inpval, email: "" });
                setIsChecked(false);
                nextStep();
              })
              .catch((error) => {
                alert("please check your OTP");
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          console.log(error);
        });
    }
  };
  // ========    #Personal Details    Page:2 =======
  const [firstname, setFirstname] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [firstNameValidation, setFirstNameValidation] = useState("");
  const [lastNameValidation, setLastNameValidation] = useState("");
  const [phoneNumberValidation, setPhoneNumberValidation] = useState("");

  const submitUserinfo = async (e) => {
    e.preventDefault();
    // Validation for First Name
    if (firstname === "") {
      setFirstNameValidation("First Name can't be blank");
    } else {
      setFirstNameValidation("");
    }

    // Validation for Last Name
    if (lastName === "") {
      setLastNameValidation("Last Name can't be blank");
    } else {
      setLastNameValidation("");
    }

    // Validation for Phone Number
    if (phoneNumber === "" || phoneNumber.length < 6) {
      setPhoneNumberValidation("Phone number must contain at least 6 digits, excluding the country code");
    } else {
      setPhoneNumberValidation("");
    }

    // If all validations pass, proceed to next step
    if (firstname && lastName && phoneNumber && phoneNumber.length >= 3) {
      nextStep();
    }
  };

  const handleFirstNameChange = (e) => {
    setFirstname(e.target.value);
    updateContactName();
  };

  const handleMiddleNameChange = (e) => {
    setMiddleName(e.target.value);
    updateContactName();
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    updateContactName();
  };

  const updateContactName = () => {
    setAccountName(`${firstname} ${middleName} ${lastName}`);
  };

  //****************************case 3 */
  const [inppass, setInppass] = useState({
    password: "",
    cpassword: "",
  });

  //console.log
  const setValP = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setInppass(() => {
      return {
        ...inppass,
        [name]: value,
      };
    });
  };

  const submitPassword = async (e) => {
    e.preventDefault();

    const { password, cpassword } = inppass;

    if (password === "") {
      alert("password is required!", {
        position: "top-center",
      });
    } else if (password.length < 8) {
      alert("password must be 6 char!", {
        position: "top-center",
      });
    } else if (cpassword === "") {
      alert("cpassword is required!", {
        position: "top-center",
      });
    } else if (cpassword.length < 8) {
      alert("confirm password must be 6 char!", {
        position: "top-center",
      });
    } else if (password !== cpassword) {
      alert("pass and Cpass are not matching!", {
        position: "top-center",
      });
    } else {
      sendOtpVerify();
    }

    navigate("/");
  };

  const [otp, setOtp] = useState("");

  //**************** set data */
  const sendOtpVerify = async (e) => {
    if (otp === "") {
      toast.error(" Verification code required! ", {
        position: "top-center",
      });
    } else {
      let data = JSON.stringify({
        email: inpval.email,
        otp: otp,
      });
      const url = `${USER_LOGIN_API}/verifyclient-otp/`;

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: url,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          if (response.data === "Email verified successfully") {
            clientalldata();
          } else {
          }
        })
        .catch((error) => {
          alert("please check your OTP");
          console.log(error);
        });
    }
  };
  //===================================================
  const clientalldata = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: inpval.email,
      firstName: firstname,
      middleName: middleName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      accountName: accountName,
      password: inppass.password,
      cpassword: inppass.cpassword,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(raw);
    const url = `${USER_LOGIN_API}/admin/clientsignup/`;

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((result) => {
        console.log(result);
        newUser();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error signing up. Please try again.");
      });
  };
  //************************ */
  const newUser = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username: firstname,
      email: inpval.email,
      password: inppass.password,
      role: "Client",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const url = `${USER_LOGIN_API}/common/login/signup`;

    fetch(url, requestOptions)
      .then((response) => response.text())

      .then((result) => {
        console.log(result);
        clientCreatedmail();
        handleaccountSubmit();
        // userCreatedmail();
      })

      .catch((error) => console.error(error));
  };

  const clientCreatedmail = () => {
    const port = window.location.port;
    const urlportlogin = "http://localhost:3000/login";
    console.log(urlportlogin);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const url = urlportlogin;
    const raw = JSON.stringify({
      email: inpval.email,
      url: url,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const urlusersavedmail = `${USER_LOGIN_API}/clientsavedemail/`;
    fetch(urlusersavedmail, requestOptions)
      .then((response) => response.text())

      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.error(error));
  };

  const handleaccountSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      clientType: "Individual",
      accountName: accountName,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const url = `${USER_LOGIN_API}/accountdetails/`;

    fetch(url, requestOptions)
      .then((response) => response.text())

      .then((result) => {
        console.log(result); // Log the result
        toast.success("Client SignUp successfully"); // Display success toast
        // window.location.reload();
      })
      .catch((error) => {
        console.error(error); // Log the error
        toast.error("An error occurred while submitting the form", error); // Display error toast
      });
  };

  ///////////////////////////////////////////////////////////////////////

  const navigate = useNavigate();
  const handleSignInClick = () => {
    navigate("/login");
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpConfirmPassword = (event) => {
    event.preventDefault();
  };

  const renderFormFields = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Box sx={{ padding: "10px 15px", display: "flex", alignItems: "center" }}>
              <img src={micropms} style={{ height: "40px" }} />
              <Typography variant="h6" sx={{ fontFamily: "sans-serif", color: "black", fontSize: "20px", fontWeight: "700" }}>
                PMS Solutions
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "5%",

                maxHeight: "100vh", // Full viewport height
                flexDirection: "column", // Column direction for centering
              }}
            >
              <Box sx={{ p: 3 }}>
                <Typography
                  variant="h1"
                  sx={{
                    color: "black",
                    fontSize: "35px",
                    fontWeight: "700",
                    mb: "20px",
                    textAlign: "center",
                    fontFamily: "sans-serif",
                  }}
                >
                  Welcome to SNP Tax & Financials
                </Typography>
                <p className="subtitle" style={{ textAlign: "center" }}>
                  Let's get started
                </p>
              </Box>
              <Box>
                <Box>
                  <Typography>Email</Typography>
                  <TextField fullWidth name="email" id="email" placeholder="Email" size="large" sx={{ mt: 1 }} onChange={setVal} value={inpval.email} checked={isChecked} />
                </Box>

                <Box mt={2}>
                  <Typography sx={{ mt: 4 }} variant="h7">
                    <input type="checkbox" id="terms" onChange={setValbox} checked={isChecked} />
                    By signing up you agree to TaxDome Terms of Service, Privacy Policy and SMS Policy
                  </Typography>
                </Box>

                <Box onClick={nextStep} mt={3} textAlign="center">
                  <Button onClick={createAccount} sx={{ borderRadius: "10px", width: "30%", p: 1 }} variant="contained" color="primary">
                    Continue
                  </Button>
                </Box>

                <Box mt={2} mb={10} textAlign="center">
                  <Typography>
                    Already have an account?{" "}
                    <span onClick={handleSignInClick} style={{ color: "#439cea", cursor: "pointer", fontWeight: "bold" }}>
                      Sign in
                    </span>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </>
        );
      case 2:
        return (
          <Box>
            <Box sx={{ padding: "10px 15px", display: "flex", alignItems: "center" }}>
              <img src={micropms} style={{ height: "40px" }} />
              <Typography variant="h6" sx={{ fontFamily: "sans-serif", color: "black", fontSize: "20px", fontWeight: "700" }}>
                PMS Solutions
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // margin: "2%",
                maxHeight: "100vh", // Full viewport height
                flexDirection: "column", // Column direction for centering
              }}
            >
              <Box>
                <Typography
                  variant="h1"
                  sx={{
                    color: "black",
                    fontSize: "35px",
                    fontWeight: "700",

                    textAlign: "center",
                    fontFamily: "sans-serif",
                  }}
                >
                  Welcome to SNP Tax & Financials
                </Typography>
                <p className="subtitle" style={{ textAlign: "center" }}>
                  Some basic details about you
                </p>

                <Box>
                  <InputLabel sx={{ color: "black", mt: 2 }}>First name</InputLabel>
                  <TextField fullWidth name="First name" placeholder="First name" size="small" sx={{ mt: 1 }} value={firstname} onChange={handleFirstNameChange} />
                  <Box style={{ color: "red", fontSize: "9px" }}>{firstNameValidation}</Box>
                </Box>
                <Box>
                  <InputLabel sx={{ color: "black" }}>Middle name</InputLabel>
                  <TextField fullWidth value={middleName} onChange={handleMiddleNameChange} name="Middle name" placeholder="Middle name" size="small" sx={{ mt: 1 }} />
                </Box>

                <Box>
                  <InputLabel sx={{ color: "black", mt: 2 }}>Last name</InputLabel>
                  <TextField fullWidth value={lastName} onChange={handleLastNameChange} placeholder="Last name" size="small" sx={{ mt: 1 }} />
                  <Box style={{ color: "red", fontSize: "9px" }}>{lastNameValidation}</Box>
                </Box>

                <Box>
                  <InputLabel sx={{ color: "black", mt: 2 }}>Account name</InputLabel>
                  <TextField fullWidth name="Account name" value={accountName} onChange={(e) => setAccountName(e.target.value)} placeholder="Account name" size="small" sx={{ mt: 1 }} />
                </Box>

                <Box>
                  <InputLabel sx={{ color: "black", mt: 2 }}>Phnone number</InputLabel>
                  <TextField fullWidth name="Phone Number" placeholder="--- --- ---" size="small" sx={{ mt: 1 }} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                  <Box style={{ color: "red", fontSize: "9px" }}>{phoneNumberValidation}</Box>
                </Box>
                <Box onClick={nextStep} mt={1}>
                  <Button onClick={submitUserinfo} sx={{ borderRadius: "10px", width: "30%", p: 1 }} variant="contained" color="primary">
                    <Typography>Continue</Typography>
                  </Button>
                </Box>

                <Box mt={2} mb={10}>
                  <Typography>
                    Already have an account?{" "}
                    <span onClick={handleSignInClick} style={{ color: "#439cea", cursor: "pointer", fontWeight: "bold" }}>
                      Sign in
                    </span>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        );
      case 3:
        return (
          <>
            <Box>
              <Box sx={{ padding: "10px 15px", display: "flex", alignItems: "center" }}>
                <img src={micropms} style={{ height: "40px" }} />
                <Typography variant="h6" sx={{ fontFamily: "sans-serif", color: "black", fontSize: "20px", fontWeight: "700" }}>
                  PMS Solutions
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "2%",
                  maxHeight: "100vh", // Full viewport height
                  flexDirection: "column", // Column direction for centering
                }}
              >
                <Box>
                  <Typography
                    variant="h1"
                    sx={{
                      color: "black",
                      fontSize: "35px",
                      fontWeight: "700",

                      textAlign: "center",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Welcome to SNP Tax & Financials
                  </Typography>
                  <p className="subtitle" style={{ textAlign: "center" }}>
                    Enter password
                  </p>

                  <Box mt={3}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput
                        name="password"
                        id="password"
                        onChange={setValP}
                        value={inppass.password}
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} onMouseUp={handleMouseUpPassword} edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </Box>
                  <Box mt={3}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel htmlFor="outlined-adornment-password">confirmPassword</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        name="cpassword"
                        onChange={setValP}
                        value={inppass.cpassword}
                        type={showConfirmPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility" onClick={handleClickShowConfirmPassword} onMouseDown={handleMouseDownConfirmPassword} onMouseUp={handleMouseUpConfirmPassword} edge="end">
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </Box>

                  <Box mt={4} backroundcolor={"red"}>
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      separator={<span>-</span>}
                      renderInput={(props) => <input {...props} />}
                      containerStyle={{ display: "flex" }}
                      inputStyle={{
                        width: "5rem",
                        height: "5rem",
                        margin: "0 0.5rem",
                        fontSize: "1.5rem",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        textAlign: "center",
                      }}
                    />
                  </Box>
                  <Box mt={3} textAlign="center">By signing up, you agree to our terms & conditions</Box>

                  <Box onClick={submitPassword} mt={3} textAlign="center">
                    <Button sx={{ borderRadius: "10px", width: "40%", p: 1 }} variant="contained" color="primary">
                      Let's get started
                    </Button>
                  </Box>

                  <Box mt={2} mb={10} textAlign="center">
                    <Typography>
                      Already have an account?{" "}
                      <span onClick={handleSignInClick} style={{ color: "#439cea", cursor: "pointer", fontWeight: "bold" }}>
                        Sign in
                      </span>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </>
        );
      default:
        return null;
    }
  };

  return <>{renderFormFields()}</>;
};

export default ClientSignup;
