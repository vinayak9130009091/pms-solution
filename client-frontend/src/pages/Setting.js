





// // Configure ClassNameGenerator

 
//   return (

//   )
// }

// export default Settings




import React, { useState ,useRef,useEffect} from 'react';
// import './myaccount.css';
import '../pages/setting.css';
import Box from '@mui/material/Box';
import { Typography, useMediaQuery, Button, Select, MenuItem, TextField } from '@mui/material';
import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/className';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import { useTheme } from '@mui/material/styles';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
// import user from "../Images/user.jpg";
import { Switch, FormControlLabel, Checkbox } from '@mui/material';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Setting = () => {

  ClassNameGenerator.configure((componentName) => `foo-bar-${componentName}`);


  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  const [showSaveButtons, setShowSaveButtons] = useState(false);

  const handleEditClick = () => {
    setShowSaveButtons(true);

  };

  const handleCancelButtonClick = () => {
    setShowSaveButtons(false);

  };

  const [passShow, setPassShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const toggleAlert = () => {
    setShowAlert(!showAlert);
  };
  const handleCloseAlert = () => {
    setShowAlert(false);

  };

  const handleAuthentication = () => {
    setShowAlert(!showAlert);
  };


  const [SystemLang, setSystemLang] = React.useState('');
  const options = [
    { value: "en", label: "English" },
    { value: "fr", label: "French" },
    { value: "es", label: "Spanish" },
    { value: "de", label: "German" },
    { value: "it", label: "Italian" },
    { value: "pt", label: "Portuguese" },
    { value: "ru", label: "Russian" },
    { value: "zh", label: "Chinese" },
    { value: "ja", label: "Japanese" },
    { value: "ko", label: "Korean" },

  ];
  return (
    <>
    <Box>
      <Typography variant="h4">Account Settings</Typography>
    </Box>
    <Box  className="account-settings">
      <Box mt={1.5} className="accounts-details-user">
        <Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box className='hr'>
              <Typography variant="h6">Personal details</Typography>
            </Box>
            <Box className='user-profile-container'>
              {/* <img src={user} alt="" className="user-profile-image" style={{ width: "40px", height: "40px", borderRadius: "50%", marginTop: "25px" }} /> */}
            </Box>
            <Box className='hr'>
              <BorderColorRoundedIcon sx={{ float: "right", marginBottom: "10px", cursor: "pointer", color: '#1168bf' }} onClick={handleEditClick} />
            </Box>
          </Box>
          <Box className="contact-details">
            <Box
              sx={{
                display: 'flex',
                flexDirection: isSmallScreen ? 'column' : 'row',
                gap: 5,
                padding: '1px 25px 0 5px',

              }}
            >
             
            </Box>

          

          </Box>
          {showSaveButtons && (
            <Box
              sx={{
                display: 'flex',
                gap: 4,
                padding: '1px 5px 0 5px',
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"

                sx={{
                  mt: 2,
                  width: isSmallScreen ? '100%' : 'auto',
                  borderRadius: '10px',
                }}
              >
                Save
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="primary"
                onClick={handleCancelButtonClick}
                sx={{
                  mt: 2,
                  width: isSmallScreen ? '100%' : 'auto',
                  borderRadius: '10px',
                }}

              >
                Cancel
              </Button>
            </Box>
          )}
        </Box>
        <Box className="login-details-user" >
          <Box className="login-header">
            <Typography variant="h6" ml={1}>Profile access</Typography>
            {/* <BorderColorRoundedIcon onClick={toggleAlert} sx={{ color: '#1168bf', cursor: 'pointer', mr: 2 }} />
            {showAlert && (
              <Box className="overlay">
                <Box className="overlay-login-container">
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h6">Authentication</Typography>
                    <CloseRoundedIcon onClick={handleCloseAlert} />
                  </Box>
                  <hr style={{ margin: "15px 0" }} />
                  <Box>
                    <Typography>In order to change your login details you must provide your current password.</Typography>
                  </Box>
                  <Box className="password-TextField" style={{ display: "flex", flexDirection: "column", position: "relative", marginTop: "3%" }}>
                    <Box className="TextFieldfield-container">
                      <Box sx={{ width: '94%', margin: '8px' }}>
                        <Box className="base-TextField-root">
                          <label className='custom-input-label'>Password</label>
                          <TextField
                            name="lastName"
                            type={!passShow ? "password" : "text"} placeholder="Enter Your Password" id="password"

                            size='small'
                            margin='normal'
                            fullWidth
                          />
                        </Box>
                      </Box>
                      <Box className="showpass" onClick={() => setPassShow(!passShow)} style={{ position: "absolute", top: "65%", transform: "translateY(-50%)", right: "20px", cursor: "pointer" }}>
                        {!passShow ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <NavLink to="/forgotpass" href="#" style={{ color: "rgb(100, 149, 237)", textDecoration: "none" }}>
                      Forgot Password?
                    </NavLink>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 4,
                      padding: '1px 5px 0 5px',
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"

                      sx={{
                        mt: 2,
                        width: isSmallScreen ? '100%' : 'auto',
                        borderRadius: '10px',
                      }}
                    >
                      Submit
                    </Button>
                    <Button
                      type="button"
                      variant="outlined"
                      color="primary"
                      onClick={handleCloseAlert}
                      sx={{
                        mt: 2,
                        width: isSmallScreen ? '100%' : 'auto',
                        borderRadius: '10px',
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Box>
            )} */}
          </Box>
          <Box className="hr" style={{ marginTop: "10px" }}></Box>
          {/* <Box sx={{ width: '94%', margin: '8px' }}>
            <Box className="base-TextField-root">
              <label htmlFor="last-name">Email</label>
              <TextField
                name="Email"
                type={!passShow ? "password" : "text"} placeholder="Enter Your Password" id="password"
                size='small'
                margin='normal'
                fullWidth
                sx={{backgroundColor:'#fff'}}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: isSmallScreen ? 'column' : 'row',
              gap: 5,
              padding: '1px 25px 0 5px',
            }}
          >
            <Box>
              <Box className="base-TextField-root">
                <label htmlFor="first-name">Password</label>
                <TextField
                  name="Password"
                  size='small'
                  margin='normal'
                  fullWidth
                  placeholder="Password"
                  sx={{backgroundColor:'#fff'}}
                />
              </Box>
            </Box>
            <Box>
              <Box className="base-TextField-root">
                <label htmlFor="middle-name">Confirm Password</label>
                <TextField
                  name="ConfirmPassword"
                  sx={{backgroundColor:'#fff'}}
                  size='small'
                  margin='normal'
                  fullWidth
                  placeholder="Confirm Password"
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: '94%', margin: '8px' }}>
            <Box className="base-TextField-root">
              <label htmlFor="last-name">Stay signed in for</label>
              <TextField
                name="Staysigned"
                size='small'
                margin='normal'
                fullWidth
                sx={{backgroundColor:'#fff'}}
                placeholder='Stay signed in for'
              />
            </Box>
          </Box> */}
        </Box>
        <Box>
        </Box>
        <Box className="authentication">
          <Box className="authentication-header">
            <Typography variant="h6" ml={1}>Two-factor authentication</Typography>

          </Box>
          <Box className="hr" style={{ marginTop: "10px" }}></Box>
          <Box style={{ display: "flex", gap: "10px", marginTop: "25px", cursor: "pointer", alignItems: "center" }}>
            <Switch
              onChange={handleAuthentication}
              checked={showAlert}

            />
            <Box style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <p onClick={handleAuthentication}>Turn on two-factor authencation</p>
              <HelpOutlineRoundedIcon style={{ color: "blue" }} />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className='notifiaction-details' >
        <Box className="preferences">
          <Box className="preferences-header">
            <Typography variant="h6"> Notification preferences</Typography>
            <HelpOutlineRoundedIcon style={{ color: "blue" }} />
          </Box>
          <Box className="hr" style={{ marginTop: "10px" }}></Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr" }}>
        

          </Box>
        </Box>
        <Box className="emailsyns">
          <Box>
            <Typography variant="h6"> Email Sync</Typography>
          </Box>
          <Box className="hr" style={{ marginTop: "10px" }}></Box>
          <Box style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "20px" }}>
            <p>Sync your existing email with TaxDome — all your client messages in one place.</p>
            <HelpOutlineRoundedIcon style={{ color: "blue" }} />
          </Box>
          <Box style={{ marginTop: "25px" }}>
            <Box sx={{ width: '94%', margin: '8px' }}>
              <Box className="base-TextField-root">
                <label htmlFor="last-name">Email for sync</label>
                <TextField
                  name="Email for sync"

                  size='small'
                  margin='normal'
                  fullWidth
                  placeholder="Email for sync"
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"

                sx={{
                  mt: 2,
                  width: isSmallScreen ? '100%' : 'auto',
                  borderRadius: '10px',
                }}
              >
                Sync your email
              </Button>
            </Box>
          </Box>
        </Box>
        <Box className="emailsyns" style={{ marginTop: "20px" }}>
          <Box>
            <Typography variant="h6">Download Windows app</Typography>
          </Box>
          <Box className="hr" style={{ marginTop: "10px" }}></Box>
          <Box style={{ marginTop: "20px" }}>
            <p>TaxDome Windows App help</p>
            <Link to="#">https://help.taxdome.com/article/164-taxdome-windows-application</Link>
          </Box>
        </Box>

        <Box className="emailsyns">
          <Box>
            <Typography variant="h6">International settings</Typography>
          </Box>
          <Box className="hr" style={{ marginTop: "10px" }}></Box>


          <Box>
            <Box className="base-TextField-root">
              <label htmlFor="subject">From</label>
              <Select
                value={SystemLang}
                onChange={(e) => setSystemLang(e.target.value)}
                sx={{ width: '100%', mt: 2, mb: 2 }}
                size='small'

              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Box>


      </Box>
    </Box>
  </>
  )
}

export default Setting

