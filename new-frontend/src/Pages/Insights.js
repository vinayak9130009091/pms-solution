// InsightsPage.js

import React from "react";
import { Box, Grid, Paper, Typography, Container } from "@mui/material";

const InsightsPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom mb={3}>
          Insights
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} p={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Metric 1
              </Typography>
              <Typography variant="body1">Some detailed information about Metric 1.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} p={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Metric 1
              </Typography>
              <Typography variant="body1">Some detailed information about Metric 1.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} p={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Metric 2
              </Typography>
              <Typography variant="body1">Some detailed information about Metric 2.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} p={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Metric 3
              </Typography>
              <Typography variant="body1">Some detailed information about Metric 3.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default InsightsPage;

// // // // import React, { useEffect, useState } from 'react';
// // // // import Switch from '@mui/material/Switch';
// // // // import {FormControlLabel} from '@mui/material'
// // // // const ContactInfo = () => {
// // // //   const [contacts, setContacts] = useState([]);
// // // //   const [error, setError] = useState(null);

// // // //   useEffect(() => {
// // // //     const fetchContacts = async () => {
// // // //       try {
// // // //         const response = await fetch("http://127.0.0.1:7000/contacts/contactaccount/66dad3dbcc207e600b53ae6d", {
// // // //           method: "GET",
// // // //           redirect: "follow"
// // // //         });
// // // //         if (!response.ok) {
// // // //           throw new Error('Network response was not ok');
// // // //         }
// // // //         const result = await response.json();
// // // //         setContacts(result); // Set the response as an array of contacts
// // // //       } catch (error) {
// // // //         setError(error.message);
// // // //       }
// // // //     };

// // // //     fetchContacts();
// // // //   }, []); // Empty dependency array means this effect runs once when the component mounts

// // // //   if (error) {
// // // //     return <div>Error: {error}</div>;
// // // //   }

// // // //   if (contacts.length === 0) {
// // // //     return <div>Loading...</div>;
// // // //   }

// // // //   return (
// // // //     <div>
// // // //       <h1>Contact Information</h1>
// // // //       {/* {contacts.map((contact) => {
// // // //         const { email, contactName, login, notify, emailSync } = contact;

// // // //         return (
// // // //           <div key={contact._id} style={{ marginBottom: '20px' }}>
// // // //             <h2>Contact ID: {contact._id}</h2>
// // // //             <p><strong>Contact Name:</strong> {contactName}</p>
// // // //             <p><strong>Email:</strong> {email}</p>
// // // //             <p><strong>Login:</strong> {login ? 'true' : 'false'}</p>
// // // //             <p><strong>Notify:</strong> {notify ? 'true' : 'false'}</p>
// // // //             <p><strong>Email Sync:</strong> {emailSync ? 'true' : 'false'}</p>
// // // //           </div>
// // // //         );
// // // //       })} */}

// // // // {contacts.map((contact) => {
// // // //         const { email, contactName, login, notify, emailSync } = contact;

// // // //         return (
// // // //           <div key={contact._id} style={{ marginBottom: '20px' }}>
// // // //             <h2>Contact ID: {contact._id}</h2>
// // // //             <p><strong>Contact Name:</strong> {contactName}</p>
// // // //             <p><strong>Email:</strong> {email}</p>
// // // //             <FormControlLabel
// // // //               control={<Switch checked={login} />}
// // // //               label="Login"
// // // //             />
// // // //             <FormControlLabel
// // // //               control={<Switch checked={notify} />}
// // // //               label="Notify"
// // // //             />
// // // //             <FormControlLabel
// // // //               control={<Switch checked={emailSync} />}
// // // //               label="Email Sync"
// // // //             />
// // // //           </div>
// // // //         );
// // // //       })}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ContactInfo;

// // // import React, { useState } from 'react';
// // // import CreatableSelect from 'react-select/creatable';

// // // const options = [
// // //   { value: 'chocolate', label: 'Chocolate' },
// // //   { value: 'strawberry', label: 'Strawberry' },
// // //   { value: 'vanilla', label: 'Vanilla' }
// // // ];

// // // const MyCreatableSelect = () => {
// // //   const [selectedOption, setSelectedOption] = useState(null);

// // //   const handleChange = (newValue) => {
// // //     setSelectedOption(newValue);
// // //   };

// // //   return (
// // //     <CreatableSelect
// // //       isClearable
// // //       value={selectedOption}
// // //       onChange={handleChange}
// // //       options={options}
// // //       placeholder="Select or create an option"
// // //     />
// // //   );
// // // };

// // // export default MyCreatableSelect;

// // import React, { useState } from 'react';
// // import { Stepper, Step, StepLabel, Box, Button } from '@mui/material';

// // const MyForm = () => {
// //     const [currentStep, setCurrentStep] = useState(0); // Tracks the main steps (Email, Information, Settings)
// //     const [subStep, setSubStep] = useState(3); // Tracks sub-steps within Information (Cases 3-7)
// //     const [settingsStep, setSettingsStep] = useState(8); // Tracks sub-steps within Settings (Cases 8-9)

// //     const steps = ['Email', 'Information', 'Settings'];

// //     const renderFormFields = () => {
// //         switch (currentStep) {
// //             // Email (Case 2)
// //             case 0:
// //                 return (
// //                     <>
// //                         <div>Email Step Content (Case 2)</div>
// //                     </>
// //                 );

// //             // Information (Cases 3-7)
// //             case 1:
// //                 return (
// //                     <>
// //                         {renderInformationSteps()}
// //                     </>
// //                 );

// //             // Settings (Cases 8-9)
// //             case 2:
// //                 return (
// //                     <>
// //                         {renderSettingsSteps()}
// //                     </>
// //                 );

// //             default:
// //                 return null;
// //         }
// //     };

// //     // Information Step (Cases 3-7)
// //     const renderInformationSteps = () => {
// //         switch (subStep) {
// //             case 3:
// //                 return <div>Case 3 Content</div>;
// //             case 4:
// //                 return <div>Case 4 Content</div>;
// //             case 5:
// //                 return <div>Case 5 Content</div>;
// //             case 6:
// //                 return <div>Case 6 Content</div>;
// //             case 7:
// //                 return <div>Case 7 Content</div>;
// //             default:
// //                 return null;
// //         }
// //     };

// //     // Settings Step (Cases 8-9)
// //     const renderSettingsSteps = () => {
// //         switch (settingsStep) {
// //             case 8:
// //                 return <div>Case 8 Content</div>;
// //             case 9:
// //                 return <div>Case 9 Content</div>;
// //             default:
// //                 return null;
// //         }
// //     };

// //     const handleNext = () => {
// //         if (currentStep === 0) {
// //             // Move from Email to Information step
// //             setCurrentStep(1);
// //         } else if (currentStep === 1) {
// //             // Handle Information sub-steps (Cases 3-7)
// //             if (subStep < 7) {
// //                 setSubStep(prevSubStep => prevSubStep + 1);
// //             } else {
// //                 // If all sub-steps are completed, move to Settings
// //                 setCurrentStep(2);
// //             }
// //         } else if (currentStep === 2) {
// //             // Handle Settings sub-steps (Cases 8-9)
// //             if (settingsStep < 9) {
// //                 setSettingsStep(prevSettingsStep => prevSettingsStep + 1);
// //             } else {
// //                 // You can add finish behavior here
// //                 console.log('Form Completed!');
// //             }
// //         }
// //     };

// //     return (
// //         <Box>
// //             <Stepper activeStep={currentStep}>
// //                 {steps.map((label, index) => (
// //                     <Step key={index}>
// //                         <StepLabel>{label}</StepLabel>
// //                     </Step>
// //                 ))}
// //             </Stepper>

// //             <Box mt={4}>
// //                 {renderFormFields()}
// //             </Box>

// //             <Box mt={4}>

// //                 <Button variant="contained" onClick={handleNext}>
// //                     {currentStep === 2 && settingsStep === 9 ? 'Finish' : 'Next'}
// //                 </Button>
// //             </Box>
// //         </Box>
// //     );
// // };

// // export default MyForm;

// import React, { useState } from 'react';
// import { Stepper, Step, StepLabel, Box, Button } from '@mui/material';

// const MyForm = () => {
//     const [currentStep, setCurrentStep] = useState(0); // Tracks the main steps (Email, Information, Settings)
//     const [subStep, setSubStep] = useState(3); // Tracks sub-steps within Information (Cases 3-7)
//     const [settingsStep, setSettingsStep] = useState(8); // Tracks sub-steps within Settings (Cases 8-9)

//     const steps = ['Email', 'Information', 'Settings'];

//     const renderFormFields = () => {
//         switch (currentStep) {
//             // Email (Case 2)
//             case 0:
//                 return (
//                     <>
//                         <div>Email Step Content (Case 2)</div>
//                     </>
//                 );

//             // Information (Cases 3-7)
//             case 1:
//                 return (
//                     <>
//                         {renderInformationSteps()}
//                     </>
//                 );

//             // Settings (Cases 8-9)
//             case 2:
//                 return (
//                     <>
//                         {renderSettingsSteps()}
//                     </>
//                 );

//             default:
//                 return null;
//         }
//     };

//     // Information Step (Cases 3-7)
//     const renderInformationSteps = () => {
//         switch (subStep) {
//             case 3:
//                 return <div>Case 3 Content</div>;
//             case 4:
//                 return <div>Case 4 Content</div>;
//             case 5:
//                 return <div>Case 5 Content</div>;
//             case 6:
//                 return <div>Case 6 Content</div>;
//             case 7:
//                 return <div>Case 7 Content</div>;
//             default:
//                 return null;
//         }
//     };

//     // Settings Step (Cases 8-9)
//     const renderSettingsSteps = () => {
//         switch (settingsStep) {
//             case 8:
//                 return <div>Case 8 Content</div>;
//             case 9:
//                 return <div>Case 9 Content</div>;
//             default:
//                 return null;
//         }
//     };

//     const handleNext = () => {
//         if (currentStep === 0) {
//             // Move from Email to Information step
//             setCurrentStep(1);
//         } else if (currentStep === 1) {
//             // Handle Information sub-steps (Cases 3-7)
//             if (subStep < 7) {
//                 setSubStep(prevSubStep => prevSubStep + 1);
//             } else {
//                 // If all sub-steps are completed, move to Settings
//                 setCurrentStep(2);
//             }
//         } else if (currentStep === 2) {
//             // Handle Settings sub-steps (Cases 8-9)
//             if (settingsStep < 9) {
//                 setSettingsStep(prevSettingsStep => prevSettingsStep + 1);
//             } else {
//                 // You can add finish behavior here
//                 console.log('Form Completed!');
//             }
//         }
//     };

//     // Function to go back to the Email step (case 0)
//     const goToEmailStep = () => {
//         setCurrentStep(0); // Set the main step to Email (case 0)
//     };

//     return (
//         <Box>
//             <Stepper activeStep={currentStep}>
//                 {steps.map((label, index) => (
//                     <Step key={index}>
//                         <StepLabel>{label}</StepLabel>
//                     </Step>
//                 ))}
//             </Stepper>

//             <Box mt={4}>
//                 {renderFormFields()}
//             </Box>

//             <Box mt={4}>
//                 {/* Button to go back to Email step */}
//                 <Button variant="outlined" color="secondary" onClick={goToEmailStep} style={{ marginRight: 16 }}>
//                     Go to Email Step
//                 </Button>

//                 {/* Button for Next functionality */}
//                 <Button variant="contained" onClick={handleNext}>
//                     {currentStep === 2 && settingsStep === 9 ? 'Finish' : 'Next'}
//                 </Button>
//             </Box>
//         </Box>
//     );
// };

// export default MyForm;

// import React, { useState } from 'react';
// import { Stepper, Step, StepLabel, Box, Button } from '@mui/material';

// const MyForm = () => {
//     const [currentStep, setCurrentStep] = useState(0); // Tracks the main steps (Email, Information, Settings)
//     const [subStep, setSubStep] = useState(3); // Tracks sub-steps within Information (Cases 3-7)
//     const [settingsStep, setSettingsStep] = useState(8); // Tracks sub-steps within Settings (Cases 8-9)
//     const [showEmailContent, setShowEmailContent] = useState(false); // Tracks whether to show Email step content

//     const steps = ['Email', 'Information', 'Settings'];

//     const renderFormFields = () => {
//         switch (currentStep) {
//             // Email (Case 2)
//             case 0:
//                 return showEmailContent ? (
//                     <div>Email Step Content (Case 2)</div>
//                 ) : null;

//             // Information (Cases 3-7)
//             case 1:
//                 return (
//                     <>
//                         {renderInformationSteps()}
//                     </>
//                 );

//             // Settings (Cases 8-9)
//             case 2:
//                 return (
//                     <>
//                         {renderSettingsSteps()}
//                     </>
//                 );

//             default:
//                 return null;
//         }
//     };

//     // Information Step (Cases 3-7)
//     const renderInformationSteps = () => {
//         switch (subStep) {
//             case 3:
//                 return <div>Case 3 Content</div>;
//             case 4:
//                 return <div>Case 4 Content</div>;
//             case 5:
//                 return <div>Case 5 Content</div>;
//             case 6:
//                 return <div>Case 6 Content</div>;
//             case 7:
//                 return <div>Case 7 Content</div>;
//             default:
//                 return null;
//         }
//     };

//     // Settings Step (Cases 8-9)
//     const renderSettingsSteps = () => {
//         switch (settingsStep) {
//             case 8:
//                 return <div>Case 8 Content</div>;
//             case 9:
//                 return <div>Case 9 Content</div>;
//             default:
//                 return null;
//         }
//     };

//     const handleNext = () => {
//         if (currentStep === 0) {
//             // Move from Email to Information step
//             setCurrentStep(1);
//         } else if (currentStep === 1) {
//             // Handle Information sub-steps (Cases 3-7)
//             if (subStep < 7) {
//                 setSubStep(prevSubStep => prevSubStep + 1);
//             } else {
//                 // If all sub-steps are completed, move to Settings
//                 setCurrentStep(2);
//             }
//         } else if (currentStep === 2) {
//             // Handle Settings sub-steps (Cases 8-9)
//             if (settingsStep < 9) {
//                 setSettingsStep(prevSettingsStep => prevSettingsStep + 1);
//             } else {
//                 // You can add finish behavior here
//                 console.log('Form Completed!');
//             }
//         }
//     };

//     // Function to show Email step content
//     const goToEmailStep = () => {
//         setShowEmailContent(true); // Show the email content
//     };

//     return (
//         <Box>
//             {/* Render the Stepper only when the Email step content is shown */}
//             {showEmailContent && (
//                 <Stepper activeStep={currentStep}>
//                     {steps.map((label, index) => (
//                         <Step key={index}>
//                             <StepLabel>{label}</StepLabel>
//                         </Step>
//                     ))}
//                 </Stepper>
//             )}

//             <Box mt={4}>
//                 {/* Render form fields based on current step */}
//                 {renderFormFields()}
//             </Box>

//             <Box mt={4}>
//                 {/* Show button to go to email step initially */}
//                 {!showEmailContent && (
//                     <Button variant="outlined" color="secondary" onClick={goToEmailStep} style={{ marginRight: 16 }}>
//                         Go to Email Step
//                     </Button>
//                 )}
// {showEmailContent && (

//                 <Button variant="contained" onClick={handleNext}>
//                     {currentStep === 2 && settingsStep === 9 ? 'Finish' : 'Next'}
//                 </Button>
//               )}
//             </Box>
//         </Box>
//     );
// };

// export default MyForm;
