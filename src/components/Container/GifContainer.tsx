import { FC } from "react";
import "./gifContainer_styles.scss";
import { unlockedIcon, lockedIcon } from "../../Icons.tsx";

interface Props {
  gifs: { url: string; importTime: string; locked: boolean }[];
  onToggleLock: any;
}

const GifContainer: FC<Props> = ({ gifs, onToggleLock }) => {
  const sortedGifs = gifs?.sort((a, b) => {
    const dateA = new Date(a.importTime).toLocaleDateString("en-CA");
    const dateB = new Date(b.importTime).toLocaleDateString("en-CA");

    return dateA.localeCompare(dateB);
  });

  return (
    <div className="gif-grid">
      {sortedGifs?.map((gif, index) => (
        <div key={index} className="gif-item ">
          {gif.url ? (
            <div className="gif-container">
              <img className="gif-image" src={gif.url} alt={`GIF ${index}`} />
              <button className="lock-button" onClick={() => onToggleLock(index)}>
                {gif.locked ? lockedIcon() : unlockedIcon()}
              </button>
            </div>
          ) : null}
          <p>{gif.importTime}</p>
        </div>
      ))}
    </div>
  );
};

export default GifContainer;
