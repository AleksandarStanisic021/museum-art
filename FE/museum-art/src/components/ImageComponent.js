import { Typography, Box } from "@mui/material/";
import { Paper } from "@mui/material/";

const ImageComponent = ({ item }) => {
  return (
    <Paper elevation={3} width={"10%"} p={1}>
      <img
        style={{ width: "40%", padding: "10px" }}
        src={`${item?.url}`}
        alt={item.name}
      ></img>
      <Typography variant="h6" element="p" pl={1}>
        {item?.name}
      </Typography>
      <Box p={2}>
        <Typography element={"xs"} variant={"xs"}>
          {item.description}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ImageComponent;
