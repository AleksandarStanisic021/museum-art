
import { TreeItem, TreeView } from "@material-ui/lab";
import {  Typography, Box, Button } from "@mui/material/";
import { Paper } from "@mui/material/";

export const TreeComponent = ({ element, handleShowImage }) => {
  return (
    <>
      <TreeView
        aria-label="file system navigator"
        sx={{
          height: 240,
          flexGrow: 1,
          maxWidth: 100,
          overflowY: "auto",
        }}
      >
        <TreeItem nodeId="1" label={element.name.toUpperCase()}>
          <Paper>
            <Paper>
              {element.collection?.map((c) => {
                return (
                  <Typography key={Math.random()} variant={"p"} element={"p"}>
                    <Box key={Math.random()}>
                      <Button
                        style={{ color: "gray" }}
                        onClick={() => handleShowImage(c.id)}
                      >
                        {c.name}
                      </Button>
                    </Box>
                  </Typography>
                );
              })}
            </Paper>
          </Paper>
        </TreeItem>
      </TreeView>
    </>
  );
};
