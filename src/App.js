import './App.css';
import {useEffect, useState } from "react";
import Header from "./Header.jsx"

function App() {
  const [charInfo, setCharInfo] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getChar()
  }, []);

  const getChar = async () => {
    // const dataArr = [];
    // let url= "https://rickandmortyapi.com/api/character?page="
    // for (let i=1; i<3; i++){
    //   fetch(`${url}${i}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     dataArr.push(...data.results)
    //   })
    // }
    // setCharInfo(dataArr);
  
    fetch(`https://rickandmortyapi.com/api/character?page=1/`)
    .then(res => res.json())
    .then(data => {
      console.log(data.results);
      setCharInfo(data.results)
    })
    }

  function getNext() {
    setIndex(thisCharIndex => {
      if ((thisCharIndex) < 19) {
        return thisCharIndex + 1;
      } else {
        return 0;
      }
    })
  }
  function getPrev() {
    setIndex(thisCharIndex => {
      if ((thisCharIndex) > 0) {
        return thisCharIndex - 1;
      } else {
        return 19;
      }
    })
  }
  
  return (
    <div className="App">
    {charInfo.length && 
    <>
      <Header />
      <div className="slider">
        <h3 id="char-id-name">#{charInfo[index].id}: {charInfo[index].name}</h3>
        <div>
          <img className="char" src={charInfo[index].image} alt="picture"/>
        </div>
        <br></br>
        <div className="slide-num">
          <button className="prev" onClick={getPrev}>&#10094; </button>
          <div className="slide-index">{charInfo[index].id} out of {charInfo.length}</div>
          <button className="next" onClick={getNext}>&#10095;</button>
        </div>
        <h3><span className="info">Status:</span> {charInfo[index].status}</h3>
        <h3><span className="info">Species:</span> {charInfo[index].species}</h3>
        <h3><span className="info">Gender:</span> {charInfo[index].gender}</h3>
        <h3><span className="info">Origin:</span> {charInfo[index].origin.name}</h3>
        <h3><span className="info">Location:</span> {charInfo[index].location.name}</h3>
        <h3><span className="info">Episodes Appeared:</span> {charInfo[index].episode.length}</h3>
      </div>
    </>
    }
    </div>
  )
}

export default App;
