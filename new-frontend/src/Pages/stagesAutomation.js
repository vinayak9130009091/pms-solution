import React, { useState, useEffect, useMemo } from "react";
import { Checkbox, Chip, Box, Button, Container, Paper, TextField, Typography, Switch, Divider, IconButton, Drawer, Autocomplete } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuPlusCircle } from "react-icons/lu";
import { toast } from "react-toastify";
import axios from "axios";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
const PipelineTemp = () => {
  const PIPELINE_API = process.env.REACT_APP_PIPELINE_TEMP_URL;
  const INVOICE_API = process.env.REACT_APP_INVOICE_TEMP_URL;
  const EMAIL_API = process.env.REACT_APP_EMAIL_TEMP_URL;
  const TAGS_API = process.env.REACT_APP_TAGS_TEMP_URL;

  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [pipelineName, setPipelineName] = useState("");
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [stages, setStages] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedStageIndex, setSelectedStageIndex] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [addEmailTemplates, setAddEmailTemplates] = useState([]);
  const [addInvoiceTemplates, setAddInvoiceTemplates] = useState([]);
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState(null);
  const [selectedInvoiceTemplate, setSelectedInvoiceTemplate] = useState(null);
  const [showAutomations, setShowAutomations] = useState(false);
  // Fetch Email Templates
  const fetchEmailTemplates = async () => {
    try {
      const url = `${EMAIL_API}/workflow/emailtemplate`;
      const response = await fetch(url);
      const data = await response.json();
      setAddEmailTemplates(data.emailTemplate);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch Invoice Templates
  const fetchInvoiceTemplates = async () => {
    try {
      const url = `${INVOICE_API}/workflow/invoicetemp/invoicetemplate`;
      const response = await fetch(url);
      const data = await response.json();
      setAddInvoiceTemplates(data.invoiceTemplate);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle template options based on action type
  const emailTemplateOptions = addEmailTemplates.map((temp) => ({
    value: temp._id,
    label: temp.templatename,
  }));

  const invoiceTemplateOptions = addInvoiceTemplates.map((temp) => ({
    value: temp._id,
    label: temp.templatename,
  }));

  // Handle drawer open for Send Invoice or Send Email
  const openDrawer = (action, stageIndex) => {
    setActionType(action);
    setSelectedStageIndex(stageIndex);
    setDrawerOpen(true);

    if (action === "Send Email") {
      fetchEmailTemplates(); // Fetch email templates when Send Email is clicked
    } else if (action === "Send Invoice") {
      fetchInvoiceTemplates(); // Fetch invoice templates when Send Invoice is clicked
    }
  };

  const handleCreatePipeline = () => {
    setShowForm(true);
  };

  const handleAddStage = () => {
    const newStage = {
      name: "",
      conditions: [],
      automations: [],
      autoMove: false,
      showDropdown: false,

      // actions: [], // Store multiple actions for each stage
    };
    setStages([...stages, newStage]);
  };

  const handleStageNameChange = (e, index) => {
    const newStages = [...stages];
    newStages[index].name = e.target.value;
    setStages(newStages);
  };

  const handleDeleteStage = (index) => {
    const updatedStages = [...stages];
    updatedStages.splice(index, 1);
    setStages(updatedStages);
  };

  const handleAutoMoveChange = (index) => {
    const updatedStages = stages.map((stage, idx) => (idx === index ? { ...stage, autoMove: !stage.autoMove } : stage));
    setStages(updatedStages);
  };

  const handleToggleDropdown = (index) => {
    const updatedStages = [...stages];
    updatedStages[index].showDropdown = !updatedStages[index].showDropdown;
    setStages(updatedStages);
  };

  const createPipe = () => {
    const data = {
      pipelineName: pipelineName,
      stages: stages,
    };
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${PIPELINE_API}/workflow/pipeline/createpipeline`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        fetchPipelineData();
        toast.success("Pipeline created successfully");
        setShowForm(false);
        clearForm();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to create pipeline");
      });
  };

  const clearForm = () => {
    setPipelineName("");
    setStages([]);
  };

  const [pipelineData, setPipelineData] = useState([]);
  useEffect(() => {
    fetchPipelineData();
  }, []);

  const fetchPipelineData = async () => {
    try {
      const url = `${PIPELINE_API}/workflow/pipeline/pipelines`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch pipeline data");
      }
      const data = await response.json();
      setPipelineData(data.pipeline);
    } catch (error) {
      console.error("Error fetching pipeline data:", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "pipelineName",
        header: "Name",
        Cell: ({ row }) => <Typography sx={{ color: "#2c59fa", cursor: "pointer", fontWeight: "bold" }}>{row.original.pipelineName}</Typography>,
      },
      {
        accessorKey: "Setting",
        header: "Setting",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: pipelineData,
    enableBottomToolbar: true,
    enableStickyHeader: true,
    enableRowSelection: true,
    enablePagination: true,
    muiTableContainerProps: { sx: { maxHeight: "400px" } },
  });

  const handleClosePipelineTemp = () => {
    if (isFormDirty) {
      const confirmClose = window.confirm("You have unsaved changes. Are you sure you want to cancel?");
      if (!confirmClose) {
        return;
      }
    }
    setShowForm(false);
  };

  useEffect(() => {
    if (pipelineName) {
      setIsFormDirty(true);
    } else {
      setIsFormDirty(false);
    }
  }, [pipelineName]);

  // New function to handle Send Invoice / Send Email action
  const handleAction = (stageIndex, selectedEmailTemplate, selectedInvoiceTemplate) => {
    const selectedTemplate = actionType === "Send Email" ? selectedEmailTemplate : selectedInvoiceTemplate;
    if (!selectedTemplate) {
      toast.error("Please select a template!");
      return;
    }
    const combinedTags = [
      ...selectedTags, // Include selectedTags
      ...selectedInvoiceTags, // Include selectedInvoiceTags
    ];
    // Update the selected stage with the action type and template
    const updatedStages = stages.map((stage, idx) => {
      if (idx === stageIndex) {
        return {
          ...stage,
          automations: [
            ...stage.automations, // Append new action
            {
              type: actionType,
              template: selectedTemplate.label,
              conditionTags: combinedTags,
              // selectedInvoiceTags
            },
          ],
        };
      }
      return stage;
    });
    setShowAutomations(true);
    setStages(updatedStages); // Update stages with new action
    setDrawerOpen(false); // Close the drawer
    // toast.success(`${actionType} sent using ${selectedTemplate.label}`);
    console.log(updatedStages);
  };

  const [isConditionsFormOpen, setIsConditionsFormOpen] = useState(false);
  const [isAnyCheckboxChecked, setIsAnyCheckboxChecked] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tempSelectedTags, setTempSelectedTags] = useState([]);

  const [isConditionsFormOpenInvoce, setIsConditionsFormOpenInvoce] = useState(false);
  const [isAnyCheckboxCheckedInvoce, setIsAnyCheckboxCheckedInvoce] = useState(false);
  const [searchInvoiceTerm, setSearchInvoiceTerm] = useState("");
  const [selectedInvoiceTags, setSelectedInvoiceTags] = useState([]);
  const [tempSelectedInvoceTags, setTempSelectedInvoceTags] = useState([]);
  const handleAddConditions = () => {
    setIsConditionsFormOpen(!isConditionsFormOpen);
  };
  const handleAddConditionsInvoice = () => {
    setIsConditionsFormOpenInvoce(!isConditionsFormOpenInvoce);
  };
  const handleGoBack = () => {
    setIsConditionsFormOpen(false);
  };
  const handleGoBackInvoice = () => {
    setIsConditionsFormOpenInvoce(false);
  };
  const handleCheckboxChange = (tag) => {
    const updatedSelectedTags = tempSelectedTags.includes(tag) ? tempSelectedTags.filter((t) => t._id !== tag._id) : [...tempSelectedTags, tag];
    setTempSelectedTags(updatedSelectedTags);
    setIsAnyCheckboxChecked(updatedSelectedTags.length > 0);
  };
  const handleCheckboxChangeInvoice = (tag) => {
    const updatedSelectedTags = tempSelectedInvoceTags.includes(tag) ? tempSelectedInvoceTags.filter((t) => t._id !== tag._id) : [...tempSelectedInvoceTags, tag];
    setTempSelectedInvoceTags(updatedSelectedTags);
    setIsAnyCheckboxCheckedInvoce(updatedSelectedTags.length > 0);
  };
  const handleAddTags = () => {
    setSelectedTags([...selectedTags, ...tempSelectedTags.filter((tag) => !selectedTags.some((t) => t._id === tag._id))]);
    setIsConditionsFormOpen(false);
    setTempSelectedTags([]);
    setSelectedInvoiceTags([...selectedInvoiceTags, ...tempSelectedTags.filter((tag) => !selectedInvoiceTags.some((t) => t._id === tag._id))]);
  };
  const handleAddTagsInvoice = () => {
    // setSelectedInvoiceTags([...selectedInvoiceTags, ...tempSelectedTags.filter((tag) => !selectedTags.some((t) => t._id === tag._id))]);
    setIsConditionsFormOpenInvoce(false);
    setTempSelectedInvoceTags([]);
    setSelectedInvoiceTags([...selectedInvoiceTags, ...tempSelectedInvoceTags.filter((tag) => !selectedInvoiceTags.some((t) => t._id === tag._id))]);
  };

  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const url = `${TAGS_API}/tags`;
      const response = await fetch(url);
      const data = await response.json();
      setTags(data.tags);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calculateWidth = (label) => Math.min(label.length * 8, 200);

  const handleSearchChangeInvoice = (e) => {
    setSearchInvoiceTerm(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredTags = tags.filter((tag) => tag.tagName.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredInvoiceTags = tags.filter((tag) => tag.tagName.toLowerCase().includes(searchTerm.toLowerCase()));
  const selectedTagElements = selectedTags.map((tag) => (
    <Box
      key={tag._id}
      sx={{
        backgroundColor: tag.tagColour,
        borderRadius: "20px",
        color: "#fff",
        fontSize: "12px",
        fontWeight: "600",
        textAlign: "center",
        padding: "3px",
        marginBottom: "5px",
        marginRight: "5px",
        display: "inline-block",
        width: `${calculateWidth(tag.tagName)}px`,
      }}
    >
      {tag.tagName}
    </Box>
  ));

  const selectedInvoiceTagElements = selectedInvoiceTags.map((tag) => (
    <Box
      key={tag._id}
      sx={{
        backgroundColor: tag.tagColour,
        borderRadius: "20px",
        color: "#fff",
        fontSize: "12px",
        fontWeight: "600",
        textAlign: "center",
        padding: "3px",
        marginBottom: "5px",
        marginRight: "5px",
        display: "inline-block",
        width: `${calculateWidth(tag.tagName)}px`,
      }}
    >
      {tag.tagName}
    </Box>
  ));

  return (
    <Container>
      {!showForm ? (
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleCreatePipeline} sx={{ mb: 3 }}>
            Create Pipeline
          </Button>
          <MaterialReactTable columns={columns} table={table} />
        </Box>
      ) : (
        <Box sx={{ mt: 2 }}>
          <Box>
            <form>
              <Box>
                <Typography variant="h5" gutterBottom>
                  Create Pipelines
                </Typography>
                <Box mt={2} mb={2}>
                  <hr />
                </Box>
                <Grid container spacing={2}>
                  <Grid xs={12} sm={5.8}>
                    <Box>
                      <label className="pipeline-lable">Pipeline Name</label>
                      <TextField fullWidth value={pipelineName} onChange={(e) => setPipelineName(e.target.value)} placeholder="Enter Pipeline Name" />
                    </Box>
                  </Grid>
                </Grid>
                <Box>
                  <Button variant="outlined" startIcon={<LuPlusCircle />} sx={{ mt: 3, mb: 2 }} onClick={handleAddStage}>
                    Add Stage
                  </Button>
                </Box>
                <Box sx={{ padding: "0 5px" }}>
                  <Box sx={{ padding: "0 5px" }}>
                    {stages.map((stage, index) => (
                      <Paper key={index} sx={{ marginBottom: "10px", border: "solid 1px #ddd", boxShadow: "none", backgroundColor: "#f9f9f9", borderRadius: "10px" }}>
                        <Box sx={{ margin: "10px 0 0 0", padding: "10px" }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Box>
                              <TextField fullWidth placeholder="Stage Name" sx={{ backgroundColor: "#fff" }} value={stage.name} onChange={(e) => handleStageNameChange(e, index)} size="small" />
                            </Box>
                            <IconButton onClick={() => handleDeleteStage(index)}>
                              <RiDeleteBin6Line color="red" />
                            </IconButton>
                          </Box>
                          <Box sx={{ mt: 1.5 }}>
                            <Typography sx={{ fontSize: "14px" }}>Conditions</Typography>
                            {stage.conditions.length === 0 ? (
                              <Typography sx={{ fontSize: "12px", color: "#808080", fontWeight: "bold" }}>There must be at least 1 condition</Typography>
                            ) : (
                              <Box>
                                <TextField fullWidth placeholder="Stage condition" sx={{ mt: 1.5, backgroundColor: "#fff" }} size="small" />
                              </Box>
                            )}
                          </Box>
                          <Divider />
                          <Box m={2}>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                              <Typography variant="h6" sx={{ fontSize: "15px", fontWeight: "bold" }}>
                                Automations
                              </Typography>
                              <Switch checked={stage.autoMove} onChange={() => handleAutoMoveChange(index)} />
                            </Box>
                            <Box>
                              <Typography variant="p" sx={{ fontSize: "14px", cursor: "pointer" }} onClick={() => handleToggleDropdown(index)}>
                                {stage.automations.length > 0 ? `Added automation (${stage.automations.length})` : "Add automations"}
                              </Typography>
                              {stage.showDropdown && (
                                <Box sx={{ mt: 2 }}>
                                  <Typography sx={{ cursor: "pointer" }} onClick={() => openDrawer("Send Invoice", index)}>
                                    Send Invoice
                                  </Typography>
                                  <Typography sx={{ cursor: "pointer", mt: 1 }} onClick={() => openDrawer("Send Email", index)}>
                                    Send Email
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                          </Box>
                          <Box>
                            {showAutomations && (
                              <Box>
                                {stage.automations.length > 0 && (
                                  <Box mt={1}>
                                    <ul>
                                      {stage.automations.map((action, actionIndex) => (
                                        <li key={actionIndex}>
                                          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                            Action: {action.type} | Template: {action.template} |Tags :{action.conditionTags && action.conditionTags.map((tag) => <Chip key={tag._id} label={tag.tagName} style={{ backgroundColor: tag.tagColour, color: "#fff", margin: "2px" }} />)}
                                          </Typography>
                                        </li>
                                      ))}
                                    </ul>
                                  </Box>
                                )}
                                <Box mt={1}></Box>
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </Paper>
                    ))}
                  </Box>
                </Box>
                <Box mt={5}>
                  <Button variant="contained" onClick={createPipe}>
                    Create Pipeline
                  </Button>
                  <Button variant="outlined" onClick={handleClosePipelineTemp} sx={{ ml: 2 }}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      )}

      {/* Drawer for Send Invoice / Send Email */}

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 350, padding: 2 }}>
          <Typography>Automations</Typography>
          {/* <Typography variant="h6">{actionType === "Send Invoice" ? "Send Invoice" : "Send Email"}</Typography> */}
          <Divider sx={{ my: 2 }} />

          {actionType === "Send Email" && (
            <>
              <Autocomplete
                options={emailTemplateOptions}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => <TextField {...params} placeholder="Select Email Template" />}
                value={selectedEmailTemplate} // Updated value for email templates
                onChange={(event, newValue) => setSelectedEmailTemplate(newValue)} // Updated onChange
                fullWidth
              />

              {selectedTags.length > 0 && (
                <Grid container alignItems="center" gap={1}>
                  <Typography>Only for:</Typography>
                  <Grid item>{selectedTagElements}</Grid>
                </Grid>
              )}
              <Typography onClick={handleAddConditions} sx={{ cursor: "pointer", color: "blue", fontWeight: "bold" }}>
                Add conditions
              </Typography>

              <Drawer anchor="right" open={isConditionsFormOpen} onClose={handleGoBack} PaperProps={{ sx: { width: "550px", padding: 2 } }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton onClick={handleGoBack}>
                    <IoMdArrowRoundBack fontSize="large" color="blue" />
                  </IconButton>
                  <Typography variant="h6">Add conditions</Typography>
                </Box>

                <Box sx={{ padding: 2 }}>
                  <Typography variant="body1">Apply automation only for accounts with these tags</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{
                      startAdornment: <AiOutlineSearch style={{ marginRight: 8 }} />,
                    }}
                    sx={{ marginTop: 2 }}
                  />

                  <Box sx={{ marginTop: 2 }}>
                    {filteredTags.map((tag) => (
                      <Box key={tag._id} sx={{ display: "flex", alignItems: "center", gap: 3, borderBottom: "1px solid grey", paddingBottom: 1 }}>
                        <Checkbox checked={tempSelectedTags.includes(tag)} onChange={() => handleCheckboxChange(tag)} />
                        <Chip label={tag.tagName} sx={{ backgroundColor: tag.tagColour, color: "#fff", fontWeight: "500", borderRadius: "20px", marginRight: 1 }} />
                      </Box>
                    ))}
                  </Box>

                  <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
                    <Button variant="contained" color="primary" disabled={!isAnyCheckboxChecked} onClick={handleAddTags}>
                      Add
                    </Button>
                    <Button variant="outlined" color="primary" onClick={handleGoBack}>
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Drawer>
            </>
          )}
          {actionType === "Send Invoice" && (
            <>
              <Autocomplete
                options={invoiceTemplateOptions}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => <TextField {...params} placeholder="Select Invoice Template" />}
                value={selectedInvoiceTemplate} // Updated value for invoice templates
                onChange={(event, newValue) => setSelectedInvoiceTemplate(newValue)} // Updated onChange
                fullWidth
              />
              {selectedInvoiceTags.length > 0 && (
                <Grid container alignItems="center" gap={1}>
                  <Typography>Only for:</Typography>
                  <Grid item>{selectedInvoiceTagElements}</Grid>
                </Grid>
              )}
              <Typography onClick={handleAddConditionsInvoice} sx={{ cursor: "pointer", color: "blue", fontWeight: "bold" }}>
                Add conditions
              </Typography>

              <Drawer anchor="right" open={isConditionsFormOpenInvoce} onClose={handleGoBackInvoice} PaperProps={{ sx: { width: "550px", padding: 2 } }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton onClick={handleGoBackInvoice}>
                    <IoMdArrowRoundBack fontSize="large" color="blue" />
                  </IconButton>
                  <Typography variant="h6">Add conditions</Typography>
                </Box>

                <Box sx={{ padding: 2 }}>
                  <Typography variant="body1">Apply automation only for accounts with these tags</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="Search..."
                    value={searchInvoiceTerm}
                    onChange={handleSearchChangeInvoice}
                    InputProps={{
                      startAdornment: <AiOutlineSearch style={{ marginRight: 8 }} />,
                    }}
                    sx={{ marginTop: 2 }}
                  />

                  <Box sx={{ marginTop: 2 }}>
                    {filteredInvoiceTags.map((tag) => (
                      <Box key={tag._id} sx={{ display: "flex", alignItems: "center", gap: 3, borderBottom: "1px solid grey", paddingBottom: 1 }}>
                        <Checkbox checked={tempSelectedInvoceTags.includes(tag)} onChange={() => handleCheckboxChangeInvoice(tag)} />
                        <Chip label={tag.tagName} sx={{ backgroundColor: tag.tagColour, color: "#fff", fontWeight: "500", borderRadius: "20px", marginRight: 1 }} />
                      </Box>
                    ))}
                  </Box>

                  <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
                    <Button variant="contained" color="primary" disabled={!isAnyCheckboxCheckedInvoce} onClick={handleAddTagsInvoice}>
                      Add
                    </Button>
                    <Button variant="outlined" color="primary" onClick={handleGoBackInvoice}>
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Drawer>
            </>
          )}
          <Box mt={4}>
            <Button variant="contained" onClick={() => handleAction(selectedStageIndex, selectedEmailTemplate, selectedInvoiceTemplate)}>
              Save
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Container>
  );
};

export default PipelineTemp;
