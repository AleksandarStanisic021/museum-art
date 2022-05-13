import "./App.css";
import { useEffect, useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material/";
import { Paper } from "@mui/material/";
import { TreeItem, TreeView } from "@material-ui/lab";

function App() {
  const [dataUs, setUsData] = useState();
  const [americanState, setAmericanState] = useState("0");

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:5000/api/data/tree/10");
      const result = await res.json();
      setUsData(result);
      return result;
    };
    getData();
  }, []);

  return (
    <>
      <Container>
        <Paper elevation={3} style={{ backgroundColor: "#f1f1f1" }}>
          <Typography
            component={"h4"}
            m={1}
            variant={"h4"}
            style={{ color: "gray" }}
            padding={1}
          >
            Museum Art
          </Typography>
        </Paper>

        {dataUs?.map((element) => {
          return (
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
                  {/*<Typography>{element.id}</Typography>*/}
                  <Paper>
                    {element.collection?.map((c) => {
                      return (
                        <Typography variant={"p"} element={"p"}>
                          <Box key={Math.random()}>
                            <Button
                              style={{ color: "gray" }}
                              onClick={() => setAmericanState(c.id)}
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
          );
        })}
      </Container>
      <Box style={{ backgroundColor: "orange" }}>{americanState}</Box>
    </>
  );
}
export default App;
