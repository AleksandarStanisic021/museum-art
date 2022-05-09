import "./App.css";
import { useEffect, useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material/";
import { Paper } from "@mui/material/";

function App() {
  const [data, setData] = useState();
  const [americanState, setAmericanState] = useState("0");

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:5000/api/data/tree/20");
      const goted = await res.json();
      setData(goted);
      return goted;
    };
    getData();
  }, []);
  console.log(americanState);
  return (
    <>
      <Container>
        <Paper elevation={3} style={{ backgroundColor: "#f1f1f1" }}>
          <Typography
            component={"h1"}
            variant={"h4"}
            style={{ color: "red" }}
            padding={1}
          >
            FE App
          </Typography>
        </Paper>

        {data?.map((element) => {
          return (
            <Paper>
              {/*<Typography>{element.id}</Typography>*/}
              <Typography element={"h2"} variant={"h5"}>
                {element.name}
              </Typography>
              <Paper>
                {element.collection?.map((c) => {
                  return (
                    <Typography variant={"p"} element={"p"}>
                      <Box key={Math.random()}>
                        <b>Name:</b>
                        <Button onClick={() => setAmericanState(c.id)}>
                          {c.name}
                        </Button>
                      </Box>
                    </Typography>
                  );
                })}
              </Paper>
            </Paper>
          );
        })}
      </Container>
      <Box>{americanState}</Box>
    </>
  );
}
export default App;
