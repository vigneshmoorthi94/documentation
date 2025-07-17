import React from "react";
import { Grid, Box, Typography, Card, Avatar, LinearProgress } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TableChartIcon from "@mui/icons-material/TableChart";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import PieChartIcon from "@mui/icons-material/PieChart";

// Explicit color mapping for badges
const colorMap = {
  error: { bg: '#ffeaea', text: '#e53935' },
  warning: { bg: '#fff8e1', text: '#ffb300' },
  success: { bg: '#eaffea', text: '#43a047' }
};

const StatBadge = ({ value, color }) => (
  <Box
    sx={{
      display: "inline-block",
      minWidth: 28,
      px: 1,
      py: 0.5,
      borderRadius: 1,
      bgcolor: colorMap[color].bg,
      color: colorMap[color].text,
      fontWeight: 600,
      fontSize: 16,
      textAlign: "center",
    }}
  >
    {value}
  </Box>
);

const ComplianceDashboard = () => {
  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 }, bgcolor: '#fafbfc', minHeight: '100vh' }}>
      <Grid container spacing={2} mb={3}>
        {/* Total Compliance Issues */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            p: 2,
            borderRadius: 3,
            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
            border: '1px solid #eee',
            background: '#fff'
          }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h6" fontWeight={600}>Total Compliance Issues</Typography>
              <Avatar sx={{ bgcolor: "#ffeaea", color: "#e53935", width: 32, height: 32 }}>
                <ErrorOutlineIcon />
              </Avatar>
            </Box>
            <Typography variant="h2" sx={{ color: '#e53935', fontWeight: 700, mb: 1 }}>47</Typography>
            <Box>
              <Box display="flex" alignItems="center" mb={0.5}>
                <Typography fontWeight={500} flex={1}>High Priority</Typography>
                <StatBadge value={15} color="error" />
              </Box>
              <Box display="flex" alignItems="center" mb={0.5}>
                <Typography fontWeight={500} flex={1}>Medium Priority</Typography>
                <StatBadge value={22} color="warning" />
              </Box>
              <Box display="flex" alignItems="center">
                <Typography fontWeight={500} flex={1}>Low Priority</Typography>
                <StatBadge value={10} color="success" />
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Issues by Table */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            p: 2,
            borderRadius: 3,
            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
            border: '1px solid #eee',
            background: '#fff'
          }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h6" fontWeight={600}>Issues by Table</Typography>
              <Avatar sx={{ bgcolor: "#eaf3ff", color: "#1976d2", width: 32, height: 32 }}>
                <TableChartIcon />
              </Avatar>
            </Box>
            {[
              { label: "Table 1", vals: [5, 4, 3] },
              { label: "Table 2", vals: [3, 3, 2] },
              { label: "Table 3", vals: [4, 7, 4] },
              { label: "Table 4", vals: [2, 4, 1] },
              { label: "Table 5", vals: [1, 4, 0] },
            ].map((row) => (
              <Box key={row.label} display="flex" alignItems="center" mb={0.5}>
                <Typography flex={1}>{row.label}</Typography>
                <StatBadge value={row.vals[0]} color="error" />
                <Box mx={0.5} />
                <StatBadge value={row.vals[1]} color="warning" />
                <Box mx={0.5} />
                <StatBadge value={row.vals[2]} color="success" />
              </Box>
            ))}
          </Card>
        </Grid>

        {/* Compliance Categories */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            p: 2,
            borderRadius: 3,
            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
            border: '1px solid #eee',
            background: '#fff'
          }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h6" fontWeight={600}>Compliance Categories</Typography>
              <Avatar sx={{ bgcolor: "#eaffea", color: "#43a047", width: 32, height: 32 }}>
                <PlaylistAddCheckIcon />
              </Avatar>
            </Box>
            {[
              { label: "140% Income", vals: [8, 6, 4] },
              { label: "Max Income Limit", vals: [4, 5, 3] },
              { label: "Max Allowed Rent", vals: [2, 5, 2] },
              { label: "Certification Date", vals: [1, 6, 1] },
            ].map((row) => (
              <Box key={row.label} display="flex" alignItems="center" mb={0.5}>
                <Typography flex={1}>{row.label}</Typography>
                <StatBadge value={row.vals[0]} color="error" />
                <Box mx={0.5} />
                <StatBadge value={row.vals[1]} color="warning" />
                <Box mx={0.5} />
                <StatBadge value={row.vals[2]} color="success" />
              </Box>
            ))}
          </Card>
        </Grid>

        {/* Resolution Status */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            p: 2,
            borderRadius: 3,
            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
            border: '1px solid #eee',
            background: '#fff'
          }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h6" fontWeight={600}>Resolution Status</Typography>
              <Avatar sx={{ bgcolor: "#f3eaff", color: "#7c4dff", width: 32, height: 32 }}>
                <PieChartIcon />
              </Avatar>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <Typography flex={1}>Open</Typography>
              <Typography fontWeight={600}>32 (86%)</Typography>
            </Box>
            <LinearProgress variant="determinate" value={86} sx={{ height: 8, borderRadius: 5, bgcolor: "#eee", mb: 1, "& .MuiLinearProgress-bar": { bgcolor: "#a259ff" } }} />
            <Box display="flex" alignItems="center" mb={1}>
              <Typography flex={1}>Resolved</Typography>
              <Typography fontWeight={600}>5 (14%)</Typography>
            </Box>
            <LinearProgress variant="determinate" value={14} sx={{ height: 8, borderRadius: 5, bgcolor: "#eee", "& .MuiLinearProgress-bar": { bgcolor: "#43a047" } }} />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ComplianceDashboard;