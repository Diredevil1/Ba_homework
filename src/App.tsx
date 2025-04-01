import { useEffect, useState } from "react";
import "./App.scss";
import GifContainer from "./components/Container/GifContainer.tsx";
import { GiphyResponse } from "./components/Container/GifContainer_types.tsx";
import { refreshIcon } from "./Icons.tsx";

// Obviously if it was real application it would be stored in .env file and wouldnt be exposed in the git,
// for the presentation purposes it will be kept here
const GIPHY_API_KEY = "9OcUAZb9DLVBAOLneyScjLzYQilf4K6t";
const GIPHY_URL = `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=&rating=pg-13`;
const LOCAL_STORAGE_KEY = "lockedGifs";

const App = () => {
  const [gifs, setGifs] = useState<Array<{ url: string; importTime: string; locked: boolean }>>(
    Array(2).fill({ url: "", importTime: "", locked: false })
  );

  const fetchGifs = async () => {
    const savedLockedGifs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}");

    const newGifs = await Promise.all(
      gifs.map(async (gif, index) => {
        if (savedLockedGifs[index]) return savedLockedGifs[index];

        const res = await fetch(GIPHY_URL);
        const { data }: GiphyResponse = await res.json();

        return {
          url: data?.images.fixed_height.url,
          importTime: data?.import_datetime,
          locked: gif.locked,
        };
      })
    );

    setGifs(newGifs);
  };

  const toggleLock = (index: number) => {
    setGifs((prevGifs) => {
      const updatedGifs = prevGifs.map((gif, i) => (i === index ? { ...gif, locked: !gif.locked } : gif));
      const savedLockedGifs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}");

      if (updatedGifs[index].locked) {
        savedLockedGifs[index] = updatedGifs[index];
      } else {
        delete savedLockedGifs[index];
      }

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedLockedGifs));

      return updatedGifs;
    });
  };

  useEffect(() => {
    fetchGifs();

    // defining keybaord press here to avoid stale keypress state
    const handleSpacePress = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        document.getElementById("fetch-images")?.click();
      }
    };
    window.addEventListener("keydown", handleSpacePress);
    return () => {
      window.removeEventListener("keydown", handleSpacePress);
    };
  }, []);

  return (
    <>
      <div className="app-container">
        <h1 style={{ margin: "0px" }}>Giphy</h1>
        <GifContainer onToggleLock={toggleLock} gifs={gifs} />
        <button className="refresh-button" id="fetch-images" onClick={() => fetchGifs()}>
          {refreshIcon()} Hit here to refresh gifs or press space
        </button>
      </div>
    </>
  );
};

export default App;
