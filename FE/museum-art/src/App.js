import "./App.css";
import { useEffect, useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material/";
import { Paper } from "@mui/material/";
import { TreeItem, TreeView } from "@material-ui/lab";

//http://localhost:5000/api/data/colection/

function App() {
  const [collectionData, setCollection] = useState();
  const [dataUs, setUsData] = useState();
  const [euData, setEuData] = useState();

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:5000/api/data/colection/");
      const result = await res.json();
      setCollection(result);
      return result;
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:5000/api/data/tree/20");
      const result = await res.json();
      setEuData(result);
      return result;
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:5000/api/data/tree/10");
      const result = await res.json();
      setUsData(result);
      return result;
    };
    getData();
  }, []);

  let collectionImages = collectionData?.collection?.map((c) => {
    return (
      <Box key={c.url} style={{ width: "60%" }}>
        <img
          style={{ width: "100%", margin: "20px" }}
          src={`${c.url}`}
          alt=""
        />
      </Box>
    );
  });

  const handleClick = (id) => {
    ///setCollection(newCollection);
    console.log(id);
  };
  console.log(collectionData);
  return (
    <>
      <Container h={100}>
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
        <Box m={1} style={{ display: "flex" }}>
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
                                onClick={() => handleClick(c.id)}
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
          {euData?.map((element) => {
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
                                onClick={() => handleClick(c.id)}
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

          <Paper
            w={100}
            elevation={3}
            style={{ backgroundColor: "#f1f1f1", height: "100vh" }}
          >
            <Box width={"40%"}> {collectionImages}</Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
}
export default App;
