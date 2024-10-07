
import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, FormControl, InputLabel, Select, MenuItem,  Container, Button } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom"

const NewOrganizer = () => {
    
    const [organizerTemplate, setOrganizerTemplate] = useState([]);
    const [organizerTemp, setOrganizerTemp] = useState(null);
    const [selectedOrganizerTemplate, setSelectedOrganizerTemplate] = useState([]); 
    const [selectedAccounts, setSelectedAccounts] = useState([]);
    const [showOrganizerForm, setShowOrganizerForm] = useState(false); 
const [organizeraccountwise, setorganizeraccountwise] = useState()
const [organizeraccountwiseid, setorganizeraccountwiseid] = useState()

    const navigate = useNavigate(); 
    const fetchOrganizerTemplateData = async () => {
        try {
            const url = "http://127.0.0.1:7600/workflow/organizers/organizertemplate/";
            const response = await fetch(url);
            const result = await response.json();
            setOrganizerTemplate(result.OrganizerTemplates);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleOrganizerTemplateChange = (event) => {
        const { value } = event.target; // Get selected values
        setSelectedOrganizerTemplate(typeof value === 'string' ? value.split(',') : value); 
    };
    const OrganizerTemplateOptions = organizerTemplate.map((organizertemp) => ({
        value: organizertemp._id,
        label: organizertemp.organizerName,
    }));
    const handleOrganizerFormClose = () => {
        setTimeout(() => {
        }, 1000);
    };


    // function fromObjectId(objectId) {
    //     if (objectId && typeof objectId === 'object' && objectId.$oid) {
    //         return objectId.$oid;
    //     }
    //     throw new Error('Invalid ObjectId format');
    // }
    
    // const objectId = { $oid: "66ac94e8c1fd3a0ef310a552" }; 
    // const id = fromObjectId(objectId);
    // console.log("Account ID:", id); 

    const createOrganizerOfAccount = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
     
   
        const raw = JSON.stringify({
            accountid: "66ac94cac1fd3a0ef310a550",
            organizertemplateid: selectedOrganizerTemplate,
            // reminders: reminder,
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
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        console.log(raw);
        const url = 'http://127.0.0.1:7600/organizer-account-wise';

        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                console.log(result.newOrganizerAccountWise);
                const { _id } = result.newOrganizerAccountWise;

                
                console.log(_id); // "66f7e5d97114d8ad832c2d3e" 
                setorganizeraccountwise(result.newOrganizerAccountWise)
                setShowOrganizerForm(true); 
                setSelectedOrganizerTemplate(selectedOrganizerTemplate);
               console.log(selectedOrganizerTemplate)
              
                navigate(`/organizerform/${_id}`);
                
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        fetchOrganizerTemplateData();
       
    }, []);

    return (
        <Container>
            <Box p={2}>
                <Typography><strong>Organizer</strong></Typography>
            </Box>
            <Divider />

            <Box mt={3} borderBottom={"2px solid #e2e8f0"} p={2}>
                <Typography fontSize={20}><strong>Create organizer</strong></Typography>
            </Box>

            <Box mt={3}>
                <FormControl fullWidth sx={{ marginBottom: '10px' }}>
                    <InputLabel>Organizer Template</InputLabel>

                    <Select
                        value={selectedOrganizerTemplate}
                        onChange={handleOrganizerTemplateChange}
                        renderValue={(selected) => (
                            <Box>
                                {selected.map((value) => {
                                    const option = OrganizerTemplateOptions.find(opt => opt.value === value);
                                    // return option ? <Chip key={value} label={option.label} /> : null;
                                    return option ? option.label : null;
                                })}
                            </Box>
                        )}
                        label="Organizer Template"
                    >
                        {OrganizerTemplateOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Box display={'flex'} gap={2} alignItems={'center'} mt={2}>
                <Box>
                    <Button onClick={createOrganizerOfAccount} variant="contained">Create</Button>
                </Box>

                <Box>
                    <Button onClick={handleOrganizerFormClose} variant='outlined'>Cancel</Button>
                </Box>

            </Box>

        </Container>
    );
}

export default NewOrganizer;
