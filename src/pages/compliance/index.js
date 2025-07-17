import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  styled,
  Typography,
  Box,
  LinearProgress,
  Card,
  CardContent,
  Button,
  Chip,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Import Style (assuming you have it)
import style from "./style";

// Import Components (adjust paths as needed)
import { ButtonComponent, CardComponent } from "../../components";

// Import Icons (adjust paths as needed)
import {
  ArchiveIcon,
  BuildingsIcon,
  ClockIcon,
  ExportIcon,
  PeoplesIcon,
} from "../../assets/svg";

function compliance(props) {
  const StyledChip = styled(Chip)(({ theme, color }) => ({
    backgroundColor: theme.palette[color]?.light,
    color: theme.palette[color]?.dark,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(0.5),
  }));
  const { className, handleExport } = props;

  const cardData = [
    {
      title: "Total Properties",
      icon: <BuildingsIcon />,
      count: "24",
      monthCount: "2",
      addedText: "added this quarte",
    },
    {
      title: "Active Contacts",
      icon: <PeoplesIcon />,
      count: "24",
      monthCount: "2",
      addedText: "added this month",
    },
    {
      title: "Recent Activities",
      icon: <ClockIcon />,
      count: "24",
      monthCount: "12",
      addedText: "in the last week",
    },
    {
      title: "Recent Activities",
      icon: <ClockIcon />,
      count: "24",
      monthCount: "12",
      addedText: "in the last week",
    },
  ];
  const ProgressLabel = styled(Typography)(({ theme, color }) => ({
    fontWeight: 600,
    color: color || theme.palette.text.primary,
    whiteSpace: "nowrap",
    fontSize: 12,
    padding: "0 8px",
    borderRadius: 12,
    backgroundColor: color ? `${color}33` : "transparent",
  }));
  const ViewDetailsButton = styled(Button)(({ theme }) => ({
    ...theme.typography.button,
    color: theme.palette.primary.main,
    backgroundColor: "transparent",
    padding: 0,
    textTransform: "none",
    minWidth: "auto",
    "&:hover": {
      backgroundColor: "transparent",
      textDecoration: "underline",
    },
  }));

  const submissionData = [
    {
      title: "Property Manager",
      totalReports: 117,
      tables: [
        { name: "Table 1", value: 32 },
        { name: "Table 2", value: 15 },
        { name: "Table 3", value: 29 },
        { name: "Table 4", value: 23 },
        { name: "Table 5", value: 18 },
      ],
      complianceIssues: 12,
      color: "primary", // Blue-ish
    },
    {
      title: "Owner",
      totalReports: 74,
      tables: [
        { name: "Table 1", value: 20 },
        { name: "Table 2", value: 10 },
        { name: "Table 3", value: 15 },
        { name: "Table 4", value: 17 },
        { name: "Table 5", value: 12 },
      ],
      complianceIssues: 8,
      color: "info", // Light Blue
    },
    {
      title: "Funder",
      totalReports: 57,
      tables: [
        { name: "Table 1", value: 15 },
        { name: "Table 2", value: 9 },
        { name: "Table 3", value: 17 },
        { name: "Table 4", value: 13 },
        { name: "Table 5", value: 8 },
      ],
      complianceIssues: 5,
      color: "warning", // Orange-ish
    },
  ];
  const unitData = [
    {
      label: "HOME Units",
      reportedPercentage: 91.7,
      reported: 110,
      required: 120,
      color: "#58C7FF",
    },
    {
      label: "NHTF Units",
      reportedPercentage: 88.2,
      reported: 75,
      required: 85,
      color: "#FFB800",
    },
    {
      label: "PSH Units",
      reportedPercentage: 96.7,
      reported: 58,
      required: 60,
      color: "#00CC88",
    },
  ];

  const chartData = {
    labels: [
      "Table 1",
      "Table 2",
      "Table 3",
      "Table 4",
      "Table 5",
      "Compliance Issues",
    ],
    datasets: [
      {
        label: "PM",
        data: [32, 15, 29, 23, 18, 12],
        backgroundColor: "rgba(153, 102, 255, 0.7)",
      },
      {
        label: "Owner",
        data: [20, 10, 15, 17, 12, 8],
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
      {
        label: "Funder",
        data: [15, 9, 17, 13, 8, 5],
        backgroundColor: "rgba(255, 159, 64, 0.7)",
      },
    ],
  };

  const chartOptions = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: false,
        text: "Submission Distribution",
      },
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
      },
    },
  };

  return (
    <Grid container className={className}>
      <Grid item xs={12} sx={{ mb: 3 }}>
        <Grid container justifyContent={"space-between"} alignItems="center">
          <Grid item></Grid>
          <Grid item className="flexAlign" sx={{ gap: 1.2 }}>
            <ButtonComponent
              variant="outlined"
              color="primary"
              className="shadow"
              startIcon={<ArchiveIcon />}
            >
              Archive
            </ButtonComponent>
            <ButtonComponent
              variant="outlined"
              size="small"
              color="primary"
              onClick={handleExport}
              startIcon={<ExportIcon />}
              sx={{ flexShrink: 0 }}
            >
              Export
            </ButtonComponent>
          </Grid>
        </Grid>
      </Grid>

      {/* header */}
      <Grid item xs={12} sx={{ mb: 3 }}>
        <Grid container spacing={3}>
          {cardData.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} className="orgCard" key={index}>
              <CardComponent shadow>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Box>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="h1">{item.count}</Typography>
                  </Box>
                  <Box className="arrowIcon flexCenter">{item.icon}</Box>
                </Box>
                <Typography variant="body1" color="text.darkest">
                  {item.monthCount} {item.addedText}
                </Typography>
              </CardComponent>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* Submission Distribution Chart */}
     
    </Grid>
  );
}

compliance.propTypes = {
  className: PropTypes.string,
  handleExport: PropTypes.func,
};

compliance.defaultProps = {
  className: "",
  handleExport: () => {},
};

export default styled(compliance)(style);