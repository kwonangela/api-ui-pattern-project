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
    // const rmData = [];
    // let url= "https://rickandmortyapi.com/api/character?page="
    // for (let i=1; i<3; i++){
    //   fetch(`${url}${i}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     rmData.push(...data.results)
    //   })
    // }
    // setCharInfo(rmData);
  
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
      <h2>Characters</h2>
      <div className="slider">
        <img className="char" src={charInfo[index].image} alt="asd"/>
        <br></br>
        <button className="prev" onClick={getPrev}>&#10094; </button>
        <button className="next" onClick={getNext}>&#10095;</button>
      
      <h3 id="char-id-name">#{charInfo[index].id} - Name: {charInfo[index].name}</h3>
      <h3>Status: {charInfo[index].status}</h3>
      <h3>Species: {charInfo[index].species}</h3>
      <h3>Gender: {charInfo[index].gender}</h3>
      <h3>Origin: {charInfo[index].origin.name}</h3>
      <h3>Location: {charInfo[index].location.name}</h3>
      <h3>Appears in: {charInfo[index].episode.length} episodes</h3>
      </div>
    </>
    }
    </div>
  )
}

export default App;
