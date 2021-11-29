import React , {Fragment, useMemo, useState} from 'react';
import './App.scss';
import {Input,Button} from 'reactstrap'
//import _ from 'lodash';

  //////////////////// EXTERNAL VARIABLES

function App() {
  
  //////////////////// DATA
  const playSets = [
    {setId: 1, playSetName: 'MOUNTAIN RANGES', answers: ['appalachian', 'urals', 'rockies', 'himalayas', 'swiss alps', 'sierra nevada', 'grand tetons', 'balkans', 'dolomites', 'carpathian', 'pyranees', 'andes']},
    {setId: 2, playSetName: 'SEAS', answers: ['red', 'north', 'black', 'baltic', 'labrador', 'arabian', 'bering', 'scotia', 'caribbean', 'chilean', 'amundsen', 'mediterranean']},
    {setId: 3, playSetName: 'SHOES', answers: ['chacos', 'birks', 'chucks', 'combat boots', 'flip flops', 'high heels']},
    {setId: 4, playSetName: 'POTATOES', answers: ['red', 'yukon gold', 'mashed', 'baked', 'sweet', 'fingerling', 'hash browns', 'golden', 'twice baked', 'wedges', 'tater tots', 'russet']},
  ];
  
  //////////////////// USE-STATES
  const [userText,setUserText] = useState("");
  const [chosenPlaySet, setPlaySet] = useState({answers: []});
  const [flungCards, setFlungCards] = useState([]);
  const [backgroundFlash, setBackgroundFlash] = useState('');
  console.log(backgroundFlash);
  
  //////////////////// UTILITY FUNCTIONS & VARIABLES

  const reactUserText = (textChange) => { // dynamic typing
    setUserText(textChange);
  };

  const pickPlaySet = (min,max) => { // randomly pick theme and return one of them
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max - min) + min);
    let chosenPlaySet = playSets[randomNumber];
    setPlaySet(chosenPlaySet);
  }

  const generateTable = useMemo(() => { // build a table with cover cards based on the answers arrays
    let rows = [];
    for(let i = 0; i < chosenPlaySet.answers.length; i+=2) {
      let index = `id${i.toString(10)}`;
      let indexPlusOne = `id${(i+1).toString(10)}`;
      rows.push(
      <tr key={i} className="tableRow">
        <td className="td"><div className={`cardGeneric ${flungCards.includes(i) ? 'flingLeft' : ''}`} id={index}></div>{chosenPlaySet.answers[i]}</td>
        <td className="td"><div className={`cardGeneric ${flungCards.includes(i + 1) ? 'flingRight' : ''}`} id={indexPlusOne}></div>{chosenPlaySet.answers[i+1]}</td>
      </tr>);
    }
    return (
      <table id="table">
        <tbody>
          {rows}
        </tbody>
      </table>);
  },[flungCards, chosenPlaySet])

  const checkForMatch = (event) => {
    setBackgroundFlash('whole');  
    console.log(backgroundFlash);
  
    if (event.key === 'Enter') {
      //if (userText === '') {setBackgroundFlash('tryAgain')};
      setUserText('');
      for (let i = 0; i < chosenPlaySet.answers.length; i++) {
        if (chosenPlaySet.answers[i] === userText) {
          setFlungCards([...flungCards, i]);
          return
        } 
      } 
      
      console.log(backgroundFlash)
      setBackgroundFlash('tryAgain');
      console.log(backgroundFlash)
      
      
    }
    
  }
    
  //////////////////// JSX RENDER
  
  return (
      <div className={backgroundFlash}>

      {chosenPlaySet.answers.length === 0 ? <Button id="start" onClick={() => {pickPlaySet(0,4)}}>
      START
      </Button> : null}
      
      <div className="themeName">{chosenPlaySet.playSetName}</div>

      {generateTable}

      <div className='input'>
        <Input 
        className="textBox" 
        type='text'
        onChange={(e) => reactUserText(e.target.value)} value={userText}
        onKeyDown={(e) => checkForMatch(e)}/>
      </div>    
      </div>   
  );
}

export default App;
