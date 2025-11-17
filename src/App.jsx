import React, { useEffect, useState } from "react";
// import {Highscore} from "./components/HighScore";


const App = () => {
  const [Data, setData] = useState([]);
  const [clickItems, setclickItems] = useState([]);
  const [High, setHigh] = useState(0);
  const [CurrScore, setCurrScore] = useState(0);
  const shuffleArray = (arr) => {
    const newArr = [...arr];
    for (let i = 0; i < newArr.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[j], newArr[i]] = [newArr[i], newArr[j]];
    }
    return newArr;
  };

  const handleClicked = (item) => {
    const isAlreadyClick = clickItems.some((i) => i.id == item.id);
    if (isAlreadyClick) {
      setclickItems(clickItems.filter((ele) => ele.id !== item.id));
      if (clickItems.filter((ele) => ele.id == item.id)) {
      
        setHigh(prev => prev > clickItems.length ? prev : clickItems.length);
        setclickItems([]);
        setCurrScore(0)
        alert("you loss the game !");
      }
    } else {
      setclickItems([...clickItems, item]);
      setCurrScore(CurrScore+1);

      if(clickItems.length == 14)
      {
        setHigh(clickItems.length+1);
        setCurrScore(0);
        setclickItems([]);
        alert("you won the game !");
      }
    }
    setData(shuffleArray(Data));
  };

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=9&limit=15`
      );
      const data = await response.json();
      const shuffled = shuffleArray(data);
      setData(shuffled);
      console.log(shuffled);
    };
    getData();
  }, []);

  return (
    <div>
     <div className="score">
        <h1>high score : {High}</h1>
        <h1>current score : {CurrScore}</h1>
     </div>
     <h2>click the card, but don't click same card again !!! </h2>
      <div className="card-con">

      {Data.map((ele, idx) => {
        return Data.length == 0 ? (
          <h1>loading...</h1>
        ) : (
          <div
          key={idx}
          className={`card ${
            clickItems.some((i) => i.id == ele.id) ? "clicked" : " "
          }`}
          onClick={() => {
            handleClicked(ele);
          }}
          >
            <img src={ele.download_url} alt="" />

          </div>
        );
      })}
      </div>
    </div>
  );
};

export default App;
