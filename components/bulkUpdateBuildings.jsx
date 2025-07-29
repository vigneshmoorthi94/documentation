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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ButtonComponent, DialogComponent } from "../../../components";
import { BackArrowIcon, SendIcon } from "../../../assets/svg";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import style from "../projectDetail/tabs/style";
import SitesTableView from "../sites/listing";
import BuildingsTableView from "../sites/tabs/buildings";

// Dummy data for demonstration
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
];

function BulkUpdateBuildings({ className, handleClose, open }) {
  // State for selectors
  const [selectedProject, setSelectedProject] = useState(projectOptions[0].id);
  const [selectedSites, setSelectedSites] = useState([1, 2]); // site ids
  const [selectedBuildings, setSelectedBuildings] = useState([1, 2]); // building ids

  // Dummy buildings for count
  const buildings = initialBuildings;

  // Dialog state for add sites/buildings
  const [addPage, setAddPage] = useState({ status: false, value: "" });

  // Save handler
  const handleSave = () => {
    // Implement your save logic here
    handleClose();
  };

  return (
    <DialogComponent
      className={`${className} bulkUpdateBuildingsDialog`}
      open={open}
      handleClose={handleClose}
      fullScreen
    >
      <Grid
        container
        className="header"
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ px: 2, pt: 2 }}
      >
        <Grid className="flexAlign">
          <ButtonComponent
            variant="outlined"
            color="primary"
            onClick={handleClose}
            startIcon={<BackArrowIcon />}
          >
            Back
          </ButtonComponent>
          <Typography variant="h4" sx={{ ml: 2 }}>
            Bulk Update Buildings
          </Typography>
        </Grid>
        <Grid item>
          <ButtonComponent
            variant="outlined"
            color="primary"
            onClick={handleClose}
          >
            Close
          </ButtonComponent>
        </Grid>
      </Grid>

      <Grid className="body" sx={{ px: 8, py: 3 }}>
        {/* Project, Site, Building Selectors */}
        <Paper sx={{ mb: 3, p: 3, borderRadius: 3 }}>
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
      </Grid>

      {/* Add Site and Building Dialog */}
      <DialogComponent
        open={addPage.status}
        handleClose={() => setAddPage({ status: false, value: "" })}
        fullWidth
        maxWidth="md"
      >
        <Grid
          container
          className="header"
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{ mb: 2 }}
        >
          <Typography variant="h4">
            {addPage.value === "sites" ? "Add Sites" : "Add Buildings"}
          </Typography>
          <Grid className="flexAlign" sx={{ gap: 2 }}>
            <Typography variant="body1" color="textSecondary">
              0 Selected
            </Typography>
            <ButtonComponent
              variant="outlined"
              color="primary"
              onClick={() => setAddPage({ status: false, value: "" })}
            >
              Cancel
            </ButtonComponent>
            <ButtonComponent
              variant="contained"
              color="primary"
              onClick={() => setAddPage({ status: false, value: "" })}
            >
              {addPage.value === "sites" ? "Add Sites" : "Add Buildings"}
            </ButtonComponent>
          </Grid>
        </Grid>

        {addPage.value === "sites" && (
          <SitesTableView
            isMiniFilter={true}
            filter={{ status: "Active", city: "New York" }}
            isRowSelectable={true}
          />
        )}

        {addPage.value === "buildings" && (
          <BuildingsTableView
            isMiniFilter={true}
            filter={{ status: "Active", city: "New York" }}
            isRowSelectable={true}
          />
        )}
      </DialogComponent>

      {/* Footer */}
      <Grid
        container
        className="footer"
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ px: 2, pb: 2 }}
      >
        <Grid item>
          <ButtonComponent
            variant="outlined"
            color="primary"
            onClick={handleClose}
          >
            Cancel
          </ButtonComponent>
        </Grid>
        <Grid item>
          <ButtonComponent
            type="button"
            variant="contained"
            color="primary"
            startIcon={<SendIcon />}
            onClick={handleSave}
          >
            Save
          </ButtonComponent>
        </Grid>
      </Grid>
    </DialogComponent>
  );
}

BulkUpdateBuildings.propTypes = {
  className: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

BulkUpdateBuildings.defaultProps = {
  className: "",
};

export default styled(BulkUpdateBuildings)(style);