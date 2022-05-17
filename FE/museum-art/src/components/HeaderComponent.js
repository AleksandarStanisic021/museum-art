import { Paper, Typography } from "@mui/material/";

const HeaderComponent = () => {
  return (
    <Paper elevation={3} style={{ backgroundColor: "#f1f1f1" }}>
      <Typography
        component={"h5"}
        m={1}
        variant={"h5"}
        style={{ color: "gray" }}
        padding={1}
      >
        Museum Art
      </Typography>
    </Paper>
  );
};

export default HeaderComponent;
