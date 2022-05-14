import "./App.css";
import { useEffect, useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material/";
import { Paper } from "@mui/material/";
import { TreeItem, TreeView } from "@material-ui/lab";

//http://localhost:5000/api/data/colection/

function App() {
  const [item, setItem] = useState({});
  const [itemDefined, setItemDefined] = useState(false);
  const [collectionData, setCollectionData] = useState({});
  const [dataUs, setUsData] = useState();
  const [euData, setEuData] = useState();

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:5000/api/data/colection/");
      const result = await res.json();
      setCollectionData(result);
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

  let collectionImage = (item) => {
    return (
      <Paper elevation={2} padding="5px">
        <img
          style={{ width: "40%", marginLeft: "30%" }}
          src={`${item?.url}`}
          alt={`${item.name}`}
        />
        <Box p={3}>
          <Typography fontSize={18}>{item?.description}</Typography>
        </Box>
      </Paper>
    );
  };

  let collectionImages = collectionData?.collection?.map((c) => {
    return (
      <Paper
        m={1}
        elevation={3}
        p={1}
        key={Math.random()}
        w={"100%"}
        style={{ backgroundColor: "#f1f1f1" }}
      >
        <img style={{ width: "40%", margin: "20px" }} src={`${c.url}`} alt="" />
        <Box p={1}>{c.description}</Box>
      </Paper>
    );
  });

  const handleClick = (id) => {
    setItemDefined(true);
    const ID = parseInt(id);
    collectionData?.collection.filter((i) => {
      if (ID == i.id) {
        setItem(i);
        return {};
      }
    });
  };
  console.log(collectionImages);
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
                          <Typography
                            key={Math.random()}
                            variant={"p"}
                            element={"p"}
                          >
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
          <Box width={"40%"} marginLeft={5}>
            {" "}
            {itemDefined ? (
              collectionImage(item)
            ) : (
              <Typography>No item selected!</Typography>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}
export default App;
