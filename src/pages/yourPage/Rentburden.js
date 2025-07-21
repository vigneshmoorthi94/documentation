import React from "react";
import PropTypes from "prop-types";
import { Grid, Box, Typography, Avatar, styled } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PeopleIcon from "@mui/icons-material/People";
import PieChartIcon from "@mui/icons-material/PieChart";
import ApartmentIcon from "@mui/icons-material/Apartment";

// Trend indicator component
const Trend = ({ value, text, type }) => {
  let color, icon;
  if (type === "up") {
    color = "#e53935";
    icon = <ArrowUpwardIcon sx={{ fontSize: 18, color, verticalAlign: "middle" }} />;
  } else {
    color = "#f59e42";
    icon = null; // You can add a down arrow or remove icon if needed
  }
  return (
    <Box display="flex" alignItems="center" mt={1}>
      {icon}
      <Typography variant="body2" sx={{ color, fontWeight: 600, ml: 0.5, mr: 0.5 }}>
        {value}
      </Typography>
      <Typography variant="body2" color="#64748b">
        {text}
      </Typography>
    </Box>
  );
};

// Card data
const cardData = [
  {
    title: "Projects with Rent Burden",
    value: "28",
    icon: <ApartmentIcon sx={{ color: "#fbbf24" }} />,
    iconBg: "#fff8e1",
    trend: { value: "4", text: "from last year", type: "up" },
    subtext: "(>30% of units)",
  },
  {
    title: "Rent-Burdened Households",
    value: "1,247",
    icon: <PeopleIcon sx={{ color: "#3b82f6" }} />,
    iconBg: "#eaf3ff",
    trend: { value: "82", text: "from last year", type: "up" },
    subtext: "",
  },
  {
    title: "Households Rent Burdened",
    value: "38.5%",
    icon: <PieChartIcon sx={{ color: "#a259ff" }} />,
    iconBg: "#f3eaff",
    trend: { value: "2.3%", text: "from last year", type: "up" },
    subtext: "(> 30% of Income)",
  },
  {
    title: "Severely Rent Burdened",
    value: "15.2%",
    icon: <ErrorOutlineIcon sx={{ color: "#e53935" }} />,
    iconBg: "#ffeaea",
    trend: { value: "1.8%", text: "from last year", type: "up" },
    subtext: "(> 50% of Income)",
  },
];

function Rentburden({ className }) {
  return (
    <Grid container className={className} spacing={3}>
      {cardData.map((item, idx) => (
        <Grid item xs={12} sm={6} md={3} key={idx}>
          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
              border: "1px solid #eee",
              background: "#fff",
              height: "100%",
              minWidth: 200,
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="body1" fontWeight={600}>
                {item.title}
              </Typography>
              <Avatar sx={{ bgcolor: item.iconBg, width: 40, height: 40 }}>
                {item.icon}
              </Avatar>
            </Box>
            <Typography variant="h3" fontWeight={700} color="text.primary">
              {item.value}
            </Typography>
            {item.subtext && (
              <Typography variant="body2" color="#64748b" sx={{ mb: 1 }}>
                {item.subtext}
              </Typography>
            )}
            <Trend {...item.trend} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

Rentburden.propTypes = {
  className: PropTypes.string,
};

Rentburden.defaultProps = {
  className: "",
};

export default styled(Rentburden)();