import "./App.css";
import { useEffect, useState } from "react";
import { Container, Typography, Box, Button, Input } from "@mui/material/";
import { Paper, Radio, RadioGroup, FormControlLabel } from "@mui/material/";
import { TreeItem, TreeView } from "@material-ui/lab";

//http://localhost:5000/api/data/colection/

function App() {
  const [radio, setRadio] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);
  const [searchData, setSearchData] = useState([]);
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
      <Paper elevation={3} padding="5px">
        <img
          style={{ width: "40%", marginLeft: "20%", marginTop: "10px" }}
          src={`${item?.url}`}
          alt={`${item.name}`}
        />
        <Typography variant="h6" element="p" pl={1}>
          {item.name}
        </Typography>
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
        <img
          style={{ background: "img", margin: "20px" }}
          src={`${c.url}`}
          alt=""
        />
        <Box p={1}>{c.description}</Box>
      </Paper>
    );
  });

  const handleShowImage = (id) => {
    setShow(true);
    setItemDefined(true);
    const ID = parseInt(id);
    collectionData?.collection.filter((i) => {
      if (ID == i.id) {
        setItem(i);
        return {};
      }
    });
  };

  const handleForm = (e) => {
    e.preventDefault();
    const { collection } = collectionData;

    const filteredData = () => {
      if (radio === "all") {
        return collection.filter((c) =>
          c?.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else if (radio === "potery" || radio === "painting") {
        return collection.filter((c) => {
          return (
            c?.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            c?.type === radio
          );
        });
      }
    };
    const data = filteredData();
    setShow(false);
    console.log("data je", data);
    setSearchData(data);
    setSearchTerm("");
  };
  console.log(radio);
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
        <form onSubmit={(e) => handleForm(e)}>
          <Box m={2}>
            <RadioGroup
              row
              value={radio}
              onChange={(e) => setRadio(e.target.value)}
            >
              <FormControlLabel control={<Radio />} value="all" label="all" />
              <FormControlLabel
                control={<Radio />}
                value="potery"
                label="potery"
              />
              <FormControlLabel
                control={<Radio />}
                value="painting"
                label="painting"
              />
            </RadioGroup>
          </Box>

          <Input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
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
            );
          })}

          {show ? (
            <Box width={"40%"} marginLeft={1}>
              {itemDefined ? (
                collectionImage(item)
              ) : (
                <Typography>No item selected!</Typography>
              )}
            </Box>
          ) : (
            <Box ml={4} width={"60%"}>
              {searchData?.map((img) => (
                <Paper elevation={3} width={"10%"} p={1}>
                  <img
                    style={{ width: "40%", padding: "10px" }}
                    src={`${img?.url}`}
                    alt={img.name}
                  ></img>
                  <Typography variant="h6" element="p" pl={1}>
                    {img.name}
                  </Typography>
                  <Box p={2}>
                    <Typography element={"xs"} variant={"xs"}>
                      {img.description}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
}
export default App;
