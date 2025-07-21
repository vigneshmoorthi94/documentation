import React from "react";
import PropTypes from "prop-types";
import { Grid, Box, Typography, Avatar, styled } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PeopleIcon from "@mui/icons-material/People";
import PieChartIcon from "@mui/icons-material/PieChart";
import ApartmentIcon from "@mui/icons-material/Apartment";

const cardData = [
  {
    title: "Projects with Rent Burden",
    value: "28",
    icon: <ApartmentIcon sx={{ color: "#fbbf24" }} />, // yellow
    iconBg: "#fff8e1",
    trend: { value: "4", text: "from last year" },
    subtext: "(>30% of units)",
    subtextColor: "#3b82f6",
  },
  {
    title: "Rent-Burdened Households",
    value: "1,247",
    icon: <PeopleIcon sx={{ color: "#3b82f6" }} />, // blue
    iconBg: "#eaf3ff",
    trend: { value: "82", text: "from last year" },
    subtext: "",
    subtextColor: "#3b82f6",
  },
  {
    title: "Households Rent Burdened",
    value: "38.5%",
    icon: <PieChartIcon sx={{ color: "#a259ff" }} />, // purple
    iconBg: "#f3eaff",
    trend: { value: "2.3%", text: "from last year" },
    subtext: "(> 30% of Income)",
    subtextColor: "#3b82f6",
  },
  {
    title: "Severely Rent Burdened",
    value: "15.2%",
    icon: <ErrorOutlineIcon sx={{ color: "#e53935" }} />, // red
    iconBg: "#ffeaea",
    trend: { value: "1.8%", text: "from last year" },
    subtext: "(> 50% of Income)",
    subtextColor: "#3b82f6",
  },
];

const Trend = ({ value, text }) => (
  <Box display="flex" alignItems="center" mt={1}>
    <ArrowUpwardIcon sx={{ fontSize: 18, color: "#e53935", verticalAlign: "middle" }} />
    <Typography
      variant="body2"
      sx={{ color: "#e53935", fontWeight: 600, ml: 0.5, mr: 0.5 }}
    >
      {value}
    </Typography>
    <Typography variant="body2" sx={{ color: "#3b82f6" }}>
      {text}
    </Typography>
  </Box>
);

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
              border: "1.5px solid #f1f5f9",
              background: "#fff",
              height: "100%",
              minWidth: 220,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="body1" fontWeight={600} color="#222">
                {item.title}
              </Typography>
              <Avatar sx={{ bgcolor: item.iconBg, width: 40, height: 40 }}>
                {item.icon}
              </Avatar>
            </Box>
            <Typography variant="h3" fontWeight={700} color="#222" sx={{ lineHeight: 1.1 }}>
              {item.value}
            </Typography>
            {item.subtext && (
              <Typography
                variant="body2"
                sx={{ color: item.subtextColor, mb: 1, fontWeight: 500 }}
              >
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