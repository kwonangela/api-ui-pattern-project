import "./App.css";
import { useEffect, useState } from "react";
import axios from 'axios';
import Header from "./Header.jsx";

function App() {
  const [characters, setCharacters] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getChar();
  }, []);

  const getChar = async () => {
    const dataArr = [];
    let url = "https://rickandmortyapi.com/api/character?page=";

    for (let i = 1; i < 43; i++) {
      dataArr.push(axios.get(`${url}${i}`));
    }

    const data = await Promise.all(dataArr);

    let filteredResults = []
    
    data.forEach((data) => {
      filteredResults.push(...data.data.results)
    })

    setCharacters(filteredResults)
  };

  function getNext() {
    setIndex((thisCharIndex) => {
      if (thisCharIndex < 825) {
        return thisCharIndex + 1;
      } else {
        return 0;
      }
    });
  }

  function getPrev() {
    setIndex((thisCharIndex) => {
      if (thisCharIndex > 0) {
        return thisCharIndex - 1;
      } else {
        return 825;
      }
    });
  }

  return (
    <div className="App">
      {characters.length && (
        <>
          <Header />
          <div className="slider">
            <h3 id="char-id-name">
              #{characters[index].id}: {characters[index].name}
            </h3>
            <div>
              <img
                className="char"
                src={characters[index].image}
                alt="Character from Rick and Morty"
              />
            </div>
            <br></br>
            <div className="slide-num">
              <button className="prev" onClick={getPrev}>
                &#10094;{" "}
              </button>
              <div className="slide-index">
                {characters[index].id} out of {characters.length}
              </div>
              <button className="next" onClick={getNext}>
                &#10095;
              </button>
            </div>
            <h3>
              <span className="info">Status:</span> {characters[index].status}
            </h3>
            <h3>
              <span className="info">Species:</span> {characters[index].species}
            </h3>
            <h3>
              <span className="info">Gender:</span> {characters[index].gender}
            </h3>
            <h3>
              <span className="info">Origin:</span>{" "}
              {characters[index].origin.name}
            </h3>
            <h3>
              <span className="info">Location:</span>{" "}
              {characters[index].location.name}
            </h3>
            <h3>
              <span className="info">Episodes Appeared:</span>{" "}
              {characters[index].episode.length}
            </h3>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
