import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:5000/api/data/tree/10");
      const goted = await res.json();
      setData(goted);
      return goted;
    };
    getData();
  }, []);

  console.log(data);

  return (
    <>
      jedi govna
      {data?.map((element) => {
        return (
          <>
            <p>{element.id}</p>
            <p>{element.name}</p>
            <p>
              {element.collection.map((c) => {
                return <li>name:{c.name}</li>;
              })}
            </p>
          </>
        );
      })}
    </>
  );
}

export default App;
