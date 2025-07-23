import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  Paper,
  Select,
  MenuItem,
  Button,
  IconButton,
  Box,
  Switch,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SendIcon from "@mui/icons-material/Send";

function BulkUpdateUnits({ className, handleClose, open }) {
  const projectOptions = [
    { id: 1, name: "Downtown" },
    { id: 2, name: "Uptown" },
    { id: 3, name: "Midtown" },
  ];

  const initialBuildings = [
    {
      key: "bldg1",
      name: "Building A",
      bin: "123456",
      site: "Site 1",
      address: "",
      city: "",
      zipcode: "",
    },
    {
      key: "bldg2",
      name: "Building B",
      bin: "654321",
      site: "Site 2",
      address: "",
      city: "",
      zipcode: "",
    },
    {
      key: "bldg3",
      name: "Building C",
      bin: "789012",
      site: "Site 3",
      address: "",
      city: "",
      zipcode: "",
    },
  ];

  const [selectedProject, setSelectedProject] = useState(projectOptions[0].id);
  const [selectedSites, setSelectedSites] = useState([1, 2]);
  const [selectedBuildings, setSelectedBuildings] = useState([1, 2]);
  const [addPage, setAddPage] = useState({ status: false, value: "" });
  const [bulkMode, setBulkMode] = useState(true);
  const [bulkFields, setBulkFields] = useState({
    address: "",
    city: "",
    zipcode: "",
  });
  const [buildings, setBuildings] = useState(initialBuildings);
  const [search, setSearch] = useState("");

  const handleModeToggle = () => setBulkMode((prev) => !prev);
  const handleBulkFieldChange = (e) => {
    setBulkFields({ ...bulkFields, [e.target.name]: e.target.value });
  };
  const handleSave = () => {
    if (bulkMode) {
      const updated = buildings.map((b) => ({
        ...b,
        ...bulkFields,
      }));
      setBuildings(updated);
      console.log("Bulk update payload:", updated);
    } else {
      console.log("Individual update payload:", buildings);
    }
    handleClose();
  };

  // For search/filter
  const filteredBuildings = buildings.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.bin.toLowerCase().includes(search.toLowerCase()) ||
      b.key.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog open={open} onClose={handleClose} fullScreen>
      <DialogContent>
        {/* Header */}
        <Grid
          container
          className="header"
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{ px: 2, pt: 2 }}
        >
          <Grid className="flexAlign">
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClose}
              startIcon={<CloseIcon />}
            >
              Back
            </Button>
            <Typography variant="h4" sx={{ ml: 2 }}>
              Bulk Update Units
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClose}
            >
              Close
            </Button>
          </Grid>
        </Grid>

        {/* Selectors */}
        <Paper sx={{ mb: 3, p: 3, borderRadius: 3, mt: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Select items to update
          </Typography>
          <Grid container spacing={3}>
            {/* Select Project */}
            <Grid item xs={4}>
              <Typography variant="body1" sx={{ pb: 1 }}>
                Select Project <span style={{ color: "red" }}>*</span>
              </Typography>
              <Select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                fullWidth
                displayEmpty
                size="small"
                sx={{ background: "#fff", borderRadius: 1 }}
              >
                {projectOptions.map((proj) => (
                  <MenuItem key={proj.id} value={proj.id}>
                    {proj.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {/* Select Sites */}
            <Grid item xs={4}>
              <Typography variant="body1" sx={{ pb: 1 }}>
                Select Sites
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => setAddPage({ status: true, value: "sites" })}
                  sx={{ textTransform: "none" }}
                >
                  Add Sites
                </Button>
                {selectedSites.length > 0 && (
                  <Box
                    sx={{
                      background: "#F5F8FF",
                      color: "#2563EB",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1.5,
                      display: "flex",
                      alignItems: "center",
                      fontWeight: 500,
                      fontSize: 14,
                    }}
                  >
                    {selectedSites.length} Sites Selected
                    <IconButton
                      size="small"
                      onClick={() => setSelectedSites([])}
                      sx={{ ml: 0.5, color: "#2563EB" }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Grid>
            {/* Select Buildings */}
            <Grid item xs={4}>
              <Typography variant="body1" sx={{ pb: 1 }}>
                Select Buildings
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => setAddPage({ status: true, value: "buildings" })}
                  sx={{ textTransform: "none" }}
                >
                  Add Buildings
                </Button>
                {selectedBuildings.length > 0 && (
                  <Box
                    sx={{
                      background: "#F5F8FF",
                      color: "#2563EB",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1.5,
                      display: "flex",
                      alignItems: "center",
                      fontWeight: 500,
                      fontSize: 14,
                    }}
                  >
                    {selectedBuildings.length} Buildings Selected
                    <IconButton
                      size="small"
                      onClick={() => setSelectedBuildings([])}
                      sx={{ ml: 0.5, color: "#2563EB" }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Update Mode Switch */}
        <Paper sx={{ mb: 3, p: 3 }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Typography variant="h6">Update Mode</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: !bulkMode ? 600 : 400,
                  color: !bulkMode ? "#111" : "#888",
                  minWidth: 72,
                  textAlign: "right",
                }}
              >
                Individual
              </Typography>
              <Switch
                checked={bulkMode}
                onChange={handleModeToggle}
                color="primary"
                inputProps={{ "aria-label": "Mode toggle" }}
              />
              <Typography
                variant="body1"
                sx={{
                  fontWeight: bulkMode ? 600 : 400,
                  color: bulkMode ? "#111" : "#888",
                  minWidth: 40,
                }}
              >
                Bulk
              </Typography>
            </Box>
          </Grid>
          <Typography variant="body2" color="textSecondary">
            Choose between bulk apply (same values for all) or individual editing
          </Typography>
        </Paper>

        {/* Bulk/Individual Table UI */}
        <Paper sx={{ p: 3, mt: 2 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            flexWrap="wrap"
            gap={2}
          >
            <Typography variant="h6">
              {buildings.length} Units selected
            </Typography>
          </Box>
          {bulkMode ? (
            <Box>
              <Typography variant="subtitle1">Bulk Update Fields</Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={4}>
                  <TextField
                    label="Address"
                    name="address"
                    value={bulkFields.address}
                    onChange={handleBulkFieldChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="City"
                    name="city"
                    value={bulkFields.city}
                    onChange={handleBulkFieldChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Zipcode"
                    name="zipcode"
                    value={bulkFields.zipcode}
                    onChange={handleBulkFieldChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Box>
              <Typography variant="subtitle1">Individual Units</Typography>
              <ul>
                {filteredBuildings.map((b) => (
                  <li key={b.key}>{b.name} ({b.bin})</li>
                ))}
              </ul>
            </Box>
          )}
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          type="button"
          variant="contained"
          color="primary"
          startIcon={<SendIcon />}
          onClick={handleSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

BulkUpdateUnits.propTypes = {
  className: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

BulkUpdateUnits.defaultProps = {
  className: "",
};

export default styled(BulkUpdateUnits)({});