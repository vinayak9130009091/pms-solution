import React, { useState, useEffect, useMemo } from "react";
import { Box, Button, Typography, Container, Paper, Autocomplete, TextField, Switch, FormControlLabel, Divider, IconButton, useMediaQuery, useTheme, Alert } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuPlusCircle, LuPenLine } from "react-icons/lu";
import { RxDragHandleDots2 } from "react-icons/rx";
import { toast } from "react-toastify";
import axios from "axios";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { CiMenuKebab } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
const PipelineTemp = () => {
  const PIPELINE_API = process.env.REACT_APP_PIPELINE_TEMP_URL;
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [showForm, setShowForm] = useState(false);
  const [pipelineName, setPipelineName] = useState("");
  const [isFormDirty, setIsFormDirty] = useState(false);
  const handleCreatePipeline = () => {
    setShowForm(true); // Show the form when button is clicked
  };

  const [stages, setStages] = useState([]);

  const handleAddStage = () => {
    const newStage = { name: "", conditions: [], automations: [], autoMove: false, showDropdown: false, activeAction: null };
    setStages([...stages, newStage]);
  };
  const handleStageNameChange = (e, index) => {
    const newStages = [...stages]; // Create a copy of the stages array
    newStages[index].name = e.target.value; // Update the name of the specific stage
    setStages(newStages); // Update the state with the modified stages array
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
        // Display success toast
        fetchPipelineData();
        toast.success("Pipeline created successfully");
        setShowForm(false);
        clearForm();
        // Additional success handling here
      })
      .catch((error) => {
        console.log(error);
        // Display error toast
        toast.error("Failed to create pipeline");
        // Additional error handling here
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
  const handleEdit = (_id) => {
    // Implement logic for editing here
    // console.log("Edit action triggered for template id: ", templateId);
    navigate("PipelineTemplateUpdate/" + _id);
  };

  //delete template
  const handleDelete = async (_id) => {
    // Show a confirmation prompt
    const isConfirmed = window.confirm("Are you sure you want to delete this pipeline?");

    // Proceed with deletion if confirmed
    if (isConfirmed) {
      const config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `${PIPELINE_API}/workflow/pipeline/pipeline/${_id}`,
        headers: {},
      };

      try {
        const response = await axios.request(config);
        console.log("Delete response:", response.data);
        toast.success("Item deleted successfully");
        fetchPipelineData();
        // Optionally, you can refresh the data or update the state to reflect the deletion
      } catch (error) {
        console.error("Error deleting pipeline:", error);
      }
    }
  };

  const [tempIdget, setTempIdGet] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const toggleMenu = (_id) => {
    setOpenMenuId(openMenuId === _id ? null : _id);
    setTempIdGet(_id);
  };
  // console.log(tempIdget)
  const columns = useMemo(
    () => [
      {
        accessorKey: "pipelineName",
        header: "Name",
        Cell: ({ row }) => (
          <Typography sx={{ color: "#2c59fa", cursor: "pointer", fontWeight: "bold" }} onClick={() => handleEdit(row.original._id)}>
            {row.original.pipelineName}
          </Typography>
        ),
      },
      {
        accessorKey: "Setting",
        header: "Setting",
        Cell: ({ row }) => (
          <IconButton onClick={() => toggleMenu(row.original._id)} style={{ color: "#2c59fa" }}>
            <CiMenuKebab style={{ fontSize: "25px" }} />
            {openMenuId === row.original._id && (
              <Box sx={{ position: "absolute", zIndex: 1, backgroundColor: "#fff", boxShadow: 1, borderRadius: 1, p: 1, left: "30px", m: 2 }}>
                <Typography
                  sx={{ fontSize: "12px", fontWeight: "bold" }}
                  onClick={() => {
                    handleEdit(row.original._id);
                  }}
                >
                  Edit
                </Typography>
                <Typography sx={{ fontSize: "12px", color: "red", fontWeight: "bold" }} onClick={() => handleDelete(row.original._id)}>
                  Delete
                </Typography>
              </Box>
            )}
          </IconButton>
        ),
      },
    ],
    [openMenuId]
  );

  const table = useMaterialReactTable({
    columns,
    data: pipelineData,
    enableBottomToolbar: true,
    enableStickyHeader: true,
    columnFilterDisplayMode: "custom", // Render own filtering UI
    enableRowSelection: true, // Enable row selection
    enablePagination: true,
    muiTableContainerProps: { sx: { maxHeight: "400px" } },
    initialState: {
      columnPinning: { left: ["mrt-row-select", "tagName"], right: ["settings"] },
    },
    muiTableBodyCellProps: {
      sx: (theme) => ({
        backgroundColor: theme.palette.mode === "dark-theme" ? theme.palette.grey[900] : theme.palette.grey[50],
      }),
    },
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

  // Detect form changes
  useEffect(() => {
    if (pipelineName) {
      setIsFormDirty(true);
    } else {
      setIsFormDirty(false);
    }
  }, [pipelineName]);

  // automations
  const [activeAction, setActiveAction] = useState(null);
  const [isAutoFormOpen, setAutoFormOpen] = useState(false);
  // const [showAutoMoveDropdown, setShowAutoMoveDropdown] = useState(false);
  const [showAutoMoveDropdown, setShowAutoMoveDropdown] = useState({});
  const handleToggleAutoMoveDropdown = (index) => {
    setShowAutoMoveDropdown((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the dropdown for the selected stage
    }));
  };
  const automoveActions = ["Send invoice", "Send email"];
  const handleActionSelect = (action) => {
    setActiveAction(action);
    toggleForm();
    const newItemNumber = items.length + 1;
    const newItem = { id: newItemNumber, action };
    setItems([...items, newItem]);
    setShowAutoMovesDropdown(false);
  };
  const handleFormClose = () => {
    setAutoFormOpen(false);
    setActiveAction(null);
    setItems([]);
  };

  const toggleForm = () => {
    setAutoFormOpen(!isAutoFormOpen);
    setShowAutoMoveDropdown(false);
  };

  const [items, setItems] = useState([]);
  const [showAutoMovesDropdown, setShowAutoMovesDropdown] = useState(false);
  const automoveActionsForm = ["Send invoice", "Send email"];
  const handleAddItems = (action) => {
    const newItemNumber = items.length + 1;
    const newItem = { id: newItemNumber, action };
    setItems([...items, newItem]);
    setShowAutoMovesDropdown(false);
  };

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
        <Box
          sx={{
            mt: 2,
          }}
        >
          <Box>
            <form>
              <Box>
                <Typography variant="h5" gutterBottom>
                  {" "}
                  Create Pipelines
                </Typography>
                <Box mt={2} mb={2}>
                  <hr />
                </Box>
                <Grid container spacing={2}>
                  <Grid xs={12} sm={5.8}>
                    <Box>
                      {/* <InputLabel className="pipeline-lable">Pipeline Name</InputLabel> */}
                      <label className="pipeline-lable">Pipeline Name</label>
                      <TextField
                        fullWidth
                        value={pipelineName}
                        onChange={(e) => setPipelineName(e.target.value)}
                        // helperText={pipelineNameError}
                        sx={{ mt: 1.5, backgroundColor: "#fff" }}
                        size="small"
                        placeholder="Pipeline Name"
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Box mt={5} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                  <Typography variant="h6">Stages</Typography>
                  <Button variant="contained" startIcon={<LuPlusCircle />} onClick={handleAddStage}>
                    Add stage
                  </Button>
                </Box>
                <Box mt={2}>
                  <hr />
                </Box>
                <Box sx={{ margin: "20px 0 10px 10px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "10px",
                      overflowX: "auto",
                      marginBottom: "10%",
                      flexDirection: isSmallScreen ? "column" : "row",
                    }}
                  >
                    {stages.map((stage, index) => (
                      <Paper
                        key={index}
                        sx={{
                          height: "auto",
                          marginTop: "20px",
                          borderRadius: "10px",
                          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                          width: isSmallScreen ? "90%" : "20%",
                          marginBottom: "20px",
                          marginLeft: isSmallScreen ? "0" : "5px",
                          alignSelf: isSmallScreen ? "center" : "flex-start",
                        }}
                      >
                        <Box sx={{ margin: "10px" }}>
                          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                            <RxDragHandleDots2 />
                            <Box sx={{ display: "flex", alignItems: "center", gap: "10px", flexGrow: 1 }}>
                              <LuPenLine />
                              <TextField variant="outlined" placeholder="Stage Name" sx={{ flexGrow: 1 }} size="small" margin="normal" value={stage.name} onChange={(e) => handleStageNameChange(e, index)} />
                            </Box>
                            <IconButton onClick={() => handleDeleteStage(index)}>
                              <RiDeleteBin6Line sx={{ color: "red", cursor: "pointer" }} />
                            </IconButton>
                          </Box>
                          <Divider />
                          <Box m={2}>
                            <Typography variant="h6" sx={{ fontSize: "15px", fontWeight: "bold" }}>
                              Stage conditions
                            </Typography>
                            {index === 0 ? <Typography variant="body2">First stage can't have conditions</Typography> : index === stages.length - 1 ? <Typography variant="body2">Last stage can't have conditions</Typography> : <Typography variant="body2">Job enters this stage if conditions are met</Typography>}
                            {index > 0 && index !== stages.length - 1 && (
                              <Box sx={{ marginTop: "10px" }}>
                                <Typography variant="body2" sx={{ cursor: "pointer", color: "blue", fontWeight: "bold" }}>
                                  Add conditions
                                </Typography>
                              </Box>
                            )}
                            <Typography variant="h6" sx={{ fontSize: "15px", fontWeight: "bold", mt: 2 }}>
                              Automations
                            </Typography>
                            <Typography variant="body2">Triggered when job enters stage</Typography>
                            <Typography variant="body2" sx={{ cursor: "pointer", color: "blue", fontWeight: "bold", mt: 2 }} onClick={() => handleToggleAutoMoveDropdown(index)}>
                              Added automation
                            </Typography>
                            <Typography variant="h6" sx={{ fontSize: "15px", mt: 2, fontWeight: "bold" }}>
                              Automove
                            </Typography>
                            <Typography variant="body2">Move jobs automatically when linked actions are completed</Typography>

                            {showAutoMoveDropdown[index] && (
                              <div className="automove-dropdown">
                                {automoveActions.map((action, idx) => (
                                  <li key={idx} onClick={() => handleActionSelect(action)}>
                                    {action}
                                  </li>
                                ))}
                              </div>
                            )}

                            <Box sx={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                              <Switch onChange={() => handleAutoMoveChange(index)} checked={stage.autoMove} color="primary" />
                              <Typography sx={{ cursor: "pointer" }}>Automove jobs</Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Paper>
                    ))}
                    <Box mt={3}>
                      <Button variant="contained" startIcon={<LuPlusCircle />} onClick={handleAddStage}>
                        Add stage
                      </Button>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ pt: 2, display: "flex", alignItems: "center", gap: 5 }}>
                  <Button variant="contained" color="primary" onClick={createPipe}>
                    Save & exit
                  </Button>

                  <Button variant="outlined" onClick={handleClosePipelineTemp}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default PipelineTemp;
