import http from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState("");
  const [date, setDate] = useState(data.date);
  const [currentDate, setCurrentDate] = useState(data.date);

  const url = `https://api.nasa.gov/planetary/apod?api_key=S2NG8l6vXiREILhEIySM1yfTdPCpZkYXbDkn6NeE${
    !date ? `` : `&date=${date}`
  }`;

  const getData = async () => {
    try {
      const response = await http.get(url);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, [date]);

  useEffect(() => {
    setDate(data.date);
  }, [data.date]);

  useEffect(() => {
    if (currentDate === undefined) return setCurrentDate(data.date);
    setCurrentDate(currentDate);
  }, [data.date]);

  return (
    <div className="App">
      <input
        type="date"
        name="date"
        id="date"
        value={date}
        max={currentDate}
        onChange={(e) => setDate(e.target.value)}
      />
      <center>
        <h1> Astronomy Picture of the Day </h1>
        <p>
          Each day a different image or photograph of our fascinating universe
          is featured, along with a brief explanation written by a professional
          astronomer.
        </p>
        <p>
          {data.date}
          <br />
          <a href={data.url}>
            {data.media_type === "image" ? (
              <img src={data.url} alt="See Explanation" />
            ) : (
              <iframe src={data.url} title="title"></iframe>
            )}
          </a>
        </p>
      </center>
      <p>
        <b> Explanation: </b>

        {data.explanation}
      </p>
    </div>
  );
}

export default App;

/* copyright: "Jason Guenzel"
date: "2022-02-19"
explanation: "The spiky stars in the foreground of this backyard telescopic frame are well within our own Milky Way Galaxy. But the two eye-catching galaxies lie far beyond the Milky Way, at a distance of over 300 million light-years. Their distorted appearance is due to gravitational tides as the pair engage in close encounters. Cataloged as Arp 273 (also as UGC 1810), the galaxies do look peculiar, but interacting galaxies are now understood to be common in the universe. Nearby, the large spiral Andromeda Galaxy is known to be some 2 million light-years away and approaching the Milky Way. The peculiar galaxies of Arp 273 may offer an analog of their far future encounter. Repeated galaxy encounters on a cosmic timescale can ultimately result in a merger into a single galaxy of stars. From our perspective, the bright cores of the Arp 273 galaxies are separated by only a little over 100,000 light-years."
hdurl: "https://apod.nasa.gov/apod/image/2202/JasonGuenzelARP273.jpg"
media_type: "image"
service_version: "v1"
title: "Peculiar Galaxies of Arp 273"
url: "https://apod.nasa.gov/apod/image/2202/JasonGuenzelARP273.jpg" */
