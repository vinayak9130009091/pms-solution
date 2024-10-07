


import { Box, LinearProgress, TextField, Typography, Divider, FormLabel, FormControlLabel, FormControl, RadioGroup, Radio, InputLabel, Select, MenuItem, Chip, Container, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const OrganizerFormPage = () => {
    const { _id } = useParams();
    console.log(_id)
    const [organizerTemp, setOrganizerTemp] = useState();
    const [fileInputs, setFileInputs] = useState({});
    const findQuestionByText = (questionText) => {
        for (const section of organizerTemp.sections) {
            for (const formElement of section.formElements) {
                if (formElement.text === questionText) {
                    return formElement;
                }
            }
        }
        return null;
    };
    
    const navigate = useNavigate();

    const accountwiseorganizerBYId = async (_id) => {
        console.log(_id)
        const requestOptions = {
            method: "Get",
            redirect: "follow",
        };

        try {
            const response = await fetch(`http://127.0.0.1:7600/organizer-account-wise/${_id}`, requestOptions);
            console.log(_id);
            if (!response.ok) {

                throw new Error("Network response was not ok");
            }

            const result = await response.json(); 
            // Log the result in a structured way
            console.log("Fetched Data:", result.organizerAccountWise);

            const { organizertemplateid } = result.organizerAccountWise;
            fetchOrganizerById(organizertemplateid);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const uppdateaccountwiseorganizerBYId = async () => {
        console.log(_id);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
            jobid: ["661e495d11a097f731ccd6e8"],
            sections: organizerTemp?.sections?.map(section => ({
                name: section?.text || '',
                id: section?.id?.toString() || '',
                text: section?.text || '',
                formElements: section?.formElements?.map(question => ({
                    type: question?.type || '',
                    id: question?.id || '',
                    sectionid: question?.sectionid || '',
                    options: question?.options?.map(option => ({
                        id: option?.id || '',
                        text: option?.text || '',
                        selected: option?.selected || false,
                    })) || [],
                    text: question?.text || '',
                    textvalue: question?.textvalue || '', 
                })) || []
            })) || [],
            active: true
        });
    
        const requestOptions = {
            method: "PATCH",
            body: raw,
            headers: {
                "Content-Type": "application/json",
            },
        };
        
        console.log(raw); 
        const url = `http://127.0.0.1:7600/organizer-account-wise/${_id}`;
        console.log(url); 
        fetch(url, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((result) => {
         navigate('/organizers');
            console.log(result);
        })
        .catch((error) => console.error('Fetch error:', error));
    
    };
    
    const fetchOrganizerById = async (organizertemplateid) => {
        console.log(organizertemplateid)

        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
        };
        const url = `http://127.0.0.1:7600/workflow/organizers/organizertemplate/${organizertemplateid}`;

        try {
            const response = await fetch(url, requestOptions);
            const result = await response.json();
            console.log("Fetch Organizer By ID Result: ", result);
            if (result && result.organizerTemplate) {
                console.log(result.organizerTemplate)
                // setOrganizerName(result.organizerTemplate.organizerName);
                setOrganizerTemp(result.organizerTemplate);
               Navigate('/organizers')
            } else {
                console.error("Invalid response structure: ", result);
            }
        } catch (error) {
            console.error('Error fetching organizer template by ID:', error);
        }
    };
    console.log(organizerTemp)


    useEffect(() => {
        accountwiseorganizerBYId(_id);
    }, []);

    const shouldShowQuestion = (question) => {
        const { required, prefilled, conditional, conditions } = question.questionsectionsettings;

        // If the question is not conditional, show it
        if (!conditional) {
            return true;
        }
        // If conditions exist, check if they are met
        if (conditional && conditions.length > 0) {
            return conditions.every(condition => {
                const relatedQuestion = findQuestionByText(condition.question);
                if (relatedQuestion) {
                    // Check if the answer to the related question matches the condition
                    const selectedOption = relatedQuestion.options.find(option => option.selected);
                    return selectedOption && selectedOption.text === condition.answer;
                }
                return false;
            });
        }
        // Default to show the question if none of the above applies
        return true;
    };

    const handleRadioToggle = (questionId, optionId) => {
        setOrganizerTemp(prevOrganizerTemp => {
            const updatedSections = prevOrganizerTemp.sections.map(section => ({
                ...section,
                formElements: section.formElements.map(question => {
                    if (question.id === questionId) {
                        return {
                            ...question,
                            options: question.options.map(option => ({
                                ...option,
                                selected: option.id === optionId
                            }))
                        };
                    }
                    return question;
                })
            }));
            return {
                ...prevOrganizerTemp,
                sections: updatedSections
            };
        });
    };
    // const handleInputChange = (questionId, value) => {
    //     setOrganizerTemp(prevOrganizerTemp => {
    //         const updatedSections = prevOrganizerTemp.sections.map(section => ({
    //             ...section,
    //             formElements: section.formElements.map(question => {
    //                 if (question.id === questionId) {
    //                     return {
    //                         ...question,
    //                         textvalue: value
    //                     };
    //                 }
    //                 return question;
    //             })
    //         }));
    //         return {
    //             ...prevOrganizerTemp,
    //             sections: updatedSections
    //         };
    //     });
    // };
  
    const handleInputChange = (questionId, value) => {
        setOrganizerTemp(prevOrganizerTemp => {
            const updatedSections = prevOrganizerTemp.sections.map(section => ({
                ...section,
                formElements: section.formElements.map(question => {
                    if (question.id === questionId) {
                        return {
                            ...question,
                            textvalue: value
                        };
                    }
                    return question;
                })
            }));
            console.log('Updated Sections:', updatedSections); // Debugging
            return {
                ...prevOrganizerTemp,
                sections: updatedSections
            };
        });
    };
    
    const handleFileInputChange = (questionId, event) => {
        const files = event.target.files;
        setFileInputs(prevState => ({
            ...prevState,
            [questionId]: files[0]
        }));
    };


    //for stepper
    const [currentStep, setCurrentStep] = useState(0); // State to track the current step

    const handleNext = () => {
        if (currentStep < organizerTemp.sections.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const sanitizeText = (text) => {
        return text.replace(/<\/?(p|a|strong|l)[^>]*>/gi, '');
    };

    return (
        <Container>
            <Box>
                {organizerTemp && (
                    <Box className="organizerform-details">
                        <form key={organizerTemp._id} id={organizerTemp._id} className="template-form">
                            <Box p={2}>
                                <Typography variant="h6">{organizerTemp.organizerName}</Typography>
                                <br />
                                <LinearProgress variant="determinate" value={(currentStep + 1) / organizerTemp.sections.length * 100} />
                            </Box>

                            <Box className="section">
                                {currentStep < organizerTemp.sections.length && (
                                    <>
                                        <Typography variant="h3" style={{ margin: "50px 0px 20px 0" }}>
                                            {organizerTemp.sections[currentStep].name}
                                        </Typography>
                                        {organizerTemp.sections[currentStep].formElements.map((question) => (
                                            <Box key={question.id} className="question">
                                                {shouldShowQuestion(question) && (
                                                    <>
                                                        <Typography style={{ margin: "13px 0" }}>
                                                            {sanitizeText(question.text)}
                                                        </Typography>

                                                        {/* Radio Buttons */}
                                                        {question.type === "Radio Buttons" && (
                                                            <FormControl component="fieldset" className="radio-container">
                                                                {/* <FormLabel component="legend">Choose an option</FormLabel> */}
                                                                <RadioGroup name={`question-${question.id}`}>
                                                                    {question.options.map((option) => (
                                                                        <FormControlLabel
                                                                            key={option.id}
                                                                            control={
                                                                                <Radio
                                                                                    checked={option.selected || false}
                                                                                    onChange={() => handleRadioToggle(question.id, option.id)}
                                                                                />
                                                                            }
                                                                            label={
                                                                                <Button
                                                                                    type="button"
                                                                                    className={`radio-button ${option.selected ? "selected" : ""}`}
                                                                                    onClick={(e) => {
                                                                                        e.preventDefault();
                                                                                        handleRadioToggle(question.id, option.id);
                                                                                    }}
                                                                                >
                                                                                    {option.text}
                                                                                </Button>
                                                                            }
                                                                        />
                                                                    ))}
                                                                </RadioGroup>
                                                            </FormControl>
                                                        )}

                                                        {/* Free Entry, Number, Email */}
                                                        {(question.type === "Free Entry" || question.type === "Number" || question.type === "Email") && (
                                                            <Box>
                                                                <TextField
                                                                    fullWidth
                                                                    variant="outlined"
                                                                    multiline
                                                                    name={`question-${question.id}`}
                                                                    className="organizerInputBoxes"
                                                                    placeholder={`${question.type} Answer`}
                                                                    value={question.textvalue ? sanitizeText(question.textvalue) : ""}
                                                                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                                                                    inputProps={{
                                                                        type: question.type === "Free Entry" ? "text" : question.type.toLowerCase(),
                                                                    }}
                                                                />
                                                            </Box>
                                                        )}

                                                        {/* File Upload */}
                                                        {question.type === "File Upload" && (
                                                            <Box className="file-upload-container">
                                                                <input
                                                                    type="file"
                                                                    name={`question-${question.id}`}
                                                                    className="file-upload-input"
                                                                    onChange={(e) => handleFileInputChange(question.id, e)}
                                                                />
                                                                <Button
                                                                    variant='contained'
                                                                    type="button"
                                                                    className="file-upload-button"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        console.log(`File uploaded for question ${question.id}:`, fileInputs[question.id]);
                                                                    }}
                                                                >
                                                                    Upload
                                                                </Button>
                                                            </Box>
                                                        )}
                                                    </>
                                                )}
                                            </Box>
                                        ))}
                                    </>
                                )}
                            </Box>
                            {/* Navigation Buttons */}
                            <Box display="flex" alignItems="center" justifyContent={'space-between'}>
                                <Box>
                                    <Button disabled={currentStep === 0} onClick={handleBack}>Back</Button>
                                    {currentStep === organizerTemp.sections.length - 1 ? (
                                        <Button onClick={uppdateaccountwiseorganizerBYId} >Submit</Button>
                                    ) : (
                                        <Button onClick={handleNext}>Next</Button>
                                    )}
                                </Box>

                                <Typography variant="subtitle1">
                                    <strong>Steps {currentStep + 1}/{organizerTemp.sections.length}</strong>
                                </Typography>
                            </Box>

                        </form>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default OrganizerFormPage;