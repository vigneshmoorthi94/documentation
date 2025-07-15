import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  Box,
  Chip,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
  Radio,
  Avatar,
  Checkbox,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { BackArrowIcon, QuestionCircleIcon } from "../../assets/svg";
import style from "./style";
import { DialogComponent, ButtonComponent } from "../../components";

function SyncOrganization(props) {
  const { className, handleClose, open } = props;
  // Dummy data for illustration
  const orgTypes = [
    {
      label: "Owner",
      count: 35,
      icon: (
        <PersonOutlineOutlinedIcon
          sx={{ color: "#2563eb", fontSize: 28, mr: 2 }}
        />
      ),
    },
    {
      label: "Property Management",
      count: 35,
      icon: (
        <BusinessOutlinedIcon sx={{ color: "#2563eb", fontSize: 28, mr: 2 }} />
      ),
    },
    {
      label: "Onsite Manager",
      count: 33,
      icon: (
        <SupervisorAccountOutlinedIcon
          sx={{ color: "#2563eb", fontSize: 28, mr: 2 }}
        />
      ),
    },
    {
      label: "Funder",
      count: 9,
      icon: (
        <MonetizationOnOutlinedIcon
          sx={{ color: "#2563eb", fontSize: 28, mr: 2 }}
        />
      ),
    },
  ];

  const organizations = [
    {
      name: "Metro Housing Management",
      type: "Property Management",
      usersCount: 8,
      users: [
        {
          initials: "JS",
          name: "John Smith",
          email: "john@sunrise.com",
          role: "Owner",
          mappedRole: "Contractor Admin",
        },
        {
          initials: "SJ",
          name: "Sarah Johnson",
          email: "sarah@sunrise.com",
          role: "Manager",
          mappedRole: "Manager",
        },
      ],
    },
    {
      name: "Sunrise Property LLC",
      type: "Owner",
      usersCount: 2,
      users: [
        {
          initials: "JS",
          name: "John Smith",
          email: "john@sunrise.com",
          role: "Owner",
          mappedRole: "Contractor Admin",
        },
        {
          initials: "SJ",
          name: "Sarah Johnson",
          email: "sarah@sunrise.com",
          role: "Manager",
          mappedRole: "Manager",
        },
      ],
    },
  ];

  // State
  const [syncMode, setSyncMode] = useState("org_users");
  const [selectedOrgType, setSelectedOrgType] = useState(orgTypes[0].label);
  const [selectedOrg, setSelectedOrg] = useState(
    organizations.find((o) => o.type === orgTypes[0].label)?.name || ""
  );
  const [selectedUsers, setSelectedUsers] = useState(
    organizations
      .find(
        (o) =>
          o.name ===
          organizations.find((o) => o.type === orgTypes[0].label)?.name
      )
      ?.users.map((u) => u.email) || []
  );
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Derived
  const orgList = organizations.filter((o) => o.type === selectedOrgType);
  const currentOrg = organizations.find((o) => o.name === selectedOrg);
  const usersList = currentOrg?.users || [];

  // Handlers
  const handleSyncModeChange = (mode) => {
    setSyncMode(mode);
  };

  const handleOrgTypeChange = (type) => {
    setSelectedOrgType(type);
    const org = organizations.find((o) => o.type === type);
    setSelectedOrg(org?.name || "");
    setSelectedUsers(org?.users.map((u) => u.email) || []);
  };

  const handleOrgChange = (orgName) => {
    setSelectedOrg(orgName);
    const org = organizations.find((o) => o.name === orgName);
    setSelectedUsers(org?.users.map((u) => u.email) || []);
  };

  const handleUserToggle = (email) => {
    setSelectedUsers((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    );
  };

  return (
    <DialogComponent
      className={`${className} excelImportDialog`}
      open={open}
      handleClose={handleClose}
      fullScreen
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid #eee",
          background: "#fff",
        }}
      >
        <ButtonComponent
          variant="outlined"
          color="primary"
          onClick={handleClose}
          startIcon={<BackArrowIcon />}
          sx={{
            mr: 2,
            borderRadius: 2,
            border: "1px solid #dbeafe",
            color: "#2563eb",
            background: "#f1f5fd",
            fontWeight: 600,
          }}
        >
          Back
        </ButtonComponent>
        <Typography variant="h5" sx={{ fontWeight: 700, flex: 1 }}>
          Organization Sync
        </Typography>
        <ButtonComponent
          variant="outlined"
          color="primary"
          onClick={() => alert("Help info here")}
          startIcon={<QuestionCircleIcon />}
          sx={{
            mr: 2,
            borderRadius: 2,
            border: "1px solid #dbeafe",
            color: "#2563eb",
            background: "#f1f5fd",
            fontWeight: 600,
          }}
        >
          Help
        </ButtonComponent>
        <ButtonComponent
          variant="contained"
          color="primary"
          sx={{ borderRadius: 2, background: "#2563eb", fontWeight: 600 }}
          onClick={() => {
            setIsSaving(true);
            setTimeout(() => {
              setIsSaving(false);
              setShowSuccess(true);
            }, 1500);
          }}
          disabled={isSaving || selectedUsers.length === 0}
        >
          {isSaving ? "Syncing..." : "Sync"}
        </ButtonComponent>
      </Box>
      <Typography sx={{ mt: 3, mb: 2, ml: 6, color: "#64748b" }}>
        Sync organisations and users from Multifamily to Homeownership platform
      </Typography>
      <Grid container spacing={3} sx={{ px: 6, pb: 6 }} alignItems="stretch">
        {/* Source Configuration */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              p: 3,
              background: "#fff",
              border: "1px solid #e5e7eb",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "100%",
            }}
          >
            {/* ... Source Configuration content ... */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <SettingsOutlinedIcon
                sx={{ color: "#2563eb", fontSize: 28, mr: 1 }}
              />
              Source Configuration
            </Typography>
            <Typography sx={{ fontWeight: 700, mb: 1, fontSize: 18 }}>
              Sync Mode
            </Typography>
            <ToggleButtonGroup
              value={syncMode}
              exclusive
              onChange={(_, v) => v && handleSyncModeChange(v)}
              sx={{
                mb: 1.5,
                width: "100%",
                border: "1.5px solid #e5e7eb",
                borderRadius: 2,
                overflow: "hidden",
                "& .MuiToggleButton-root": {
                  flex: 1,
                  py: 1.2,
                  px: 2,
                  fontWeight: 600,
                  fontSize: 16,
                  color: "#2563eb",
                  border: "none",
                  borderRadius: 0,
                  background: "#fff",
                  "&.Mui-selected": {
                    background: "#e0e7ff",
                    color: "#2563eb",
                  },
                },
              }}
            >
              <ToggleButton value="org_users">
                <HomeOutlinedIcon sx={{ mr: 1 }} />
                Org. & Users
              </ToggleButton>
              <ToggleButton value="user_only">
                <PersonOutlineOutlinedIcon sx={{ mr: 1 }} />
                User Only
              </ToggleButton>
            </ToggleButtonGroup>
            <Typography sx={{ color: "#64748b", mb: 2, fontSize: 15 }}>
              {syncMode === "org_users"
                ? "Create new organization in Homeownership with selected users"
                : "Add selected users to existing organization in Homeownership"}
            </Typography>
            <Typography sx={{ fontWeight: 700, mb: 1, fontSize: 18 }}>
              Organization Type
            </Typography>
            <Box>
              {orgTypes.map((org) => (
                <Box
                  key={org.label}
                  onClick={() => handleOrgTypeChange(org.label)}
                  sx={{
                    width: "100%",
                    mb: 1.2,
                    borderRadius: 2,
                    border:
                      selectedOrgType === org.label
                        ? "2px solid #2563eb"
                        : "1.5px solid #e5e7eb",
                    background:
                      selectedOrgType === org.label ? "#f1f5fd" : "#fff",
                    display: "flex",
                    alignItems: "center",
                    px: 2,
                    py: 1.5,
                    cursor: "pointer",
                    transition: "border 0.2s",
                  }}
                >
                  {org.icon}
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color:
                          selectedOrgType === org.label ? "#2563eb" : "#222",
                        fontSize: 16,
                      }}
                    >
                      {org.label}
                    </Typography>
                    <Typography sx={{ color: "#64748b", fontSize: 14 }}>
                      {org.count} Organizations
                    </Typography>
                  </Box>
                  <Radio
                    checked={selectedOrgType === org.label}
                    sx={{
                      color: "#2563eb",
                      "&.Mui-checked": { color: "#2563eb" },
                      ml: 1,
                    }}
                  />
                </Box>
              ))}
            </Box>
            <Typography sx={{ fontWeight: 700, mb: 1.2, mt: 3, fontSize: 18 }}>
              Select Organization
            </Typography>
            {orgList.map((org) => (
              <Box
                key={org.name}
                onClick={() => handleOrgChange(org.name)}
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  border:
                    selectedOrg === org.name
                      ? "2px solid #2563eb"
                      : "1.5px solid #e5e7eb",
                  background: "#f8fafc",
                  display: "flex",
                  alignItems: "center",
                  px: 2,
                  py: 2,
                  mb: 1.2,
                  cursor: "pointer",
                }}
              >
                <Chip
                  label={org.type}
                  size="small"
                  sx={{
                    background: "#e0e7ff",
                    color: "#2563eb",
                    fontWeight: 600,
                    mr: 2,
                    fontSize: 13,
                  }}
                />
                <HomeOutlinedIcon
                  sx={{ color: "#2563eb", fontSize: 28, mr: 2 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{ fontWeight: 600, color: "#222", fontSize: 16 }}
                  >
                    {org.name}
                  </Typography>
                  <Typography sx={{ color: "#64748b", fontSize: 14 }}>
                    {org.usersCount} Organizations
                  </Typography>
                </Box>
                <KeyboardArrowDownIcon
                  sx={{ color: "#2563eb", fontSize: 28, ml: 1 }}
                />
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* User to Sync */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              p: 3,
              background: "#fff",
              border: "1px solid #e5e7eb",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "100%",
            }}
          >
            {/* ... User to Sync content ... */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 1.5,
                display: "flex",
                alignItems: "center",
              }}
            >
              <FormatQuoteIcon sx={{ color: "#2563eb", fontSize: 28, mr: 1 }} />
              User to Sync
            </Typography>
            <Typography sx={{ color: "#94a3b8", mb: 2, fontWeight: 500 }}>
              From: <span style={{ color: "#64748b" }}>{selectedOrg}</span>
            </Typography>
            {usersList.length === 0 ? (
              <Box sx={{ flex: 1 }} />
            ) : (
              usersList.map((user) => {
                const isSelected = selectedUsers.includes(user.email);
                return (
                  <Box
                    key={user.email}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      borderRadius: 2,
                      border: isSelected
                        ? "2px solid #bcd0fa"
                        : "1px solid #e5e7eb",
                      background: isSelected ? "#f1f5fd" : "#fff",
                      mb: 2,
                      px: 2,
                      py: 1.5,
                      cursor: "pointer",
                      transition: "border 0.2s, background 0.2s",
                    }}
                    onClick={() => handleUserToggle(user.email)}
                  >
                    <Checkbox
                      checked={isSelected}
                      sx={{ mr: 2, color: "#2563eb" }}
                      onChange={() => handleUserToggle(user.email)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Avatar
                      sx={{
                        bgcolor: "#e0e7ff",
                        color: "#2563eb",
                        fontWeight: 700,
                        mr: 2,
                      }}
                    >
                      {user.initials}
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: isSelected ? "#2563eb" : "#222",
                          fontSize: 18,
                          lineHeight: 1.2,
                          mb: 0.2,
                          textDecoration: isSelected ? "underline" : "none",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "block",
                          "&:hover": {
                            textDecoration: "underline",
                            color: "#2563eb",
                          },
                        }}
                      >
                        {user.name}
                      </Typography>
                      <Typography sx={{ color: "#64748b", fontSize: 14 }}>
                        {user.email}
                      </Typography>
                    </Box>
                    <Chip
                      label={user.role}
                      size="small"
                      sx={{
                        background: "#e0e7ff",
                        color: "#2563eb",
                        fontWeight: 600,
                        mr: 1,
                        fontSize: 13,
                      }}
                    />
                    <ArrowForwardIosRoundedIcon
                      sx={{ color: "#b0b6c3", fontSize: 18, mx: 1 }}
                    />
                    <Chip
                      label={user.mappedRole}
                      size="small"
                      sx={{
                        background: "#f1f5fd",
                        color: "#2563eb",
                        fontWeight: 600,
                        fontSize: 13,
                      }}
                    />
                  </Box>
                );
              })
            )}
            <Box
              sx={{
                mt: 2,
                background: "#f1f5fd",
                borderRadius: 2,
                p: 2,
                fontWeight: 700,
                color: "#222",
                fontSize: 20,
                textAlign: "left",
              }}
            >
              {selectedUsers.length} of {usersList.length} users selected
            </Box>
          </Paper>
        </Grid>

        {/* Sync Configuration */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              p: 3,
              background: "#fff",
              border: "1px solid #e5e7eb",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "100%",
            }}
          >
            {/* ... Sync Configuration content ... */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <SettingsOutlinedIcon
                sx={{ color: "#2563eb", fontSize: 28, mr: 1 }}
              />
              Sync Configuration
            </Typography>

            {/* Target Organization Type */}
            <Typography sx={{ fontWeight: 700, mb: 1, fontSize: 18 }}>
              Target Organization Type
            </Typography>
            <Box
              sx={{
                background: "#f1f5fd",
                borderRadius: 2,
                p: 2,
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <HomeOutlinedIcon
                sx={{ color: "#2563eb", fontSize: 28, mr: 1 }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{ fontWeight: 600, color: "#222", fontSize: 16 }}
                >
                  {selectedOrg}
                </Typography>
                <Chip
                  label={
                    orgTypes.find((o) => o.label === selectedOrgType)?.label ||
                    ""
                  }
                  size="small"
                  sx={{
                    background: "#e0e7ff",
                    color: "#2563eb",
                    fontWeight: 600,
                    fontSize: 13,
                    mt: 0.5,
                  }}
                />
              </Box>
              <ArrowForwardIosRoundedIcon
                sx={{ color: "#b0b6c3", fontSize: 22, mx: 1 }}
              />
              <HomeOutlinedIcon
                sx={{ color: "#2563eb", fontSize: 28, mr: 1 }}
              />
              <Chip
                label="Contractor"
                size="small"
                sx={{
                  background: "#e0e7ff",
                  color: "#2563eb",
                  fontWeight: 600,
                  fontSize: 13,
                }}
              />
            </Box>

            {/* Users to Sync */}
            <Typography sx={{ fontWeight: 700, mb: 1, fontSize: 18 }}>
              Users to Sync
            </Typography>
            <Box
              sx={{
                background: "#f1f5fd",
                borderRadius: 2,
                p: 2,
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{ fontWeight: 600, color: "#222", fontSize: 16 }}
                >
                  {selectedUsers.length} users selected
                </Typography>
                {usersList
                  .filter((u) => selectedUsers.includes(u.email))
                  .map((user) => (
                    <Typography
                      key={user.email}
                      sx={{ color: "#64748b", fontSize: 15 }}
                    >
                      {user.name}
                    </Typography>
                  ))}
              </Box>
              <Box>
                <Typography
                  sx={{ fontWeight: 600, color: "#222", fontSize: 16 }}
                >
                  Contractor
                </Typography>
                <Chip
                  label="Admin"
                  size="small"
                  sx={{
                    background: "#e0e7ff",
                    color: "#2563eb",
                    fontWeight: 600,
                    fontSize: 13,
                    mt: 0.5,
                  }}
                />
              </Box>
            </Box>

            {/* Info Box */}
            <Box
              sx={{
                border: "1.5px solid #60a5fa",
                background: "#f1faff",
                borderRadius: 2,
                p: 2,
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
              }}
            >
              <Alert
                icon={false}
                severity="info"
                sx={{
                  background: "transparent",
                  p: 0,
                  m: 0,
                  fontWeight: 700,
                  color: "#2563eb",
                }}
              >
                Organization Sync
                <Typography
                  sx={{ fontWeight: 400, color: "#2563eb", fontSize: 15 }}
                >
                  Will create new organization in Homeownership with selected
                  users
                </Typography>
              </Alert>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Sync successful!
        </Alert>
      </Snackbar>
    </DialogComponent>
  );
}

SyncOrganization.propTypes = {
  className: PropTypes.string,
  handleClose: PropTypes.func,
  open: PropTypes.bool,
};

SyncOrganization.defaultProps = {
  className: "",
  handleClose: () => {},
  open: false,
};

export default styled(SyncOrganization)(style);