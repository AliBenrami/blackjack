import './App.css';
import { useState } from 'react';
import Spade from './Suits/SuitsSpade.svg';
import Club from './Suits/SuitsClub.svg';
import Heart from './Suits/SuitsHeart.svg';
import Diamond from './Suits/SuitsDiamond.svg';
import Blank from './Suits/blank.svg';

//util
function getRand(ls, numbout){
  if(numbout > ls.length){numbout = ls.length}
  let outlist = []
  for (let index = 0; index < numbout; index++) {
    let inRan = Math.round(Math.random() * (ls.length-1));
    outlist.push(ls[inRan]);
    ls.splice(inRan, 1);
  }
  //console.log("getrand");
  return outlist;
}
function sum(ls){
  let i = 0;
  for (let index = 0; index < ls.length; index++) {
    const element = ls[index][0];
    i+=element;
  }
  return i;
}
function getpartoflist(ls, start, end){
  let temp = structuredClone(ls);
  return temp.splice(start, end);
}

// 1     2     3       4 
// clube heart diamond spade
//card data
function makeDeck(){
  let deck = Array(52).fill(null); 
  for (let n = 0; n < deck.length/4; n++) {
    for (let s = 0; s < 4; s++) {
      //[cardval, suitnum]
      deck[(n * 4) + s] = [n+2, s];
    }
  }
  return deck;
}

//ui
function Card({Cardval, CardSuit}){
  // clube heart diamond spade
  // 0     1     2       3 

  // J  Q  K  A
  // 11 12 13 14
  function getsuite(val){
    if(val === 0){
      return Club;
    }
    if(val === 1){
      return Heart;
    }    
    if(val === 2){
      return Diamond;
    }    
    if(val === 3){
      return Spade;
    }
    if(val === 4){
      return Blank;
    }
  }
  function checkforFaceCard(val){
    if(val < 11){
      return val;
    }
    let suitels = ["J", "Q", "K", "A"]
    return suitels[val-11];
  }  
  function buttontest(){
    alert("hi");
  }
  const [suit, setsuit] = useState(getsuite(CardSuit));

  Cardval = checkforFaceCard(Cardval);

  return(
    <div className='Card'>
      <header className='CardTextTop'>
        <p>{Cardval}</p>
        <img src={suit} alt='icon' className='CardSuitsTop'/>
      </header>

      <footer className='CardTextBot'>
        <img src={suit} accessKey='icon' className='CardSuitsBot'/>
        <p>{Cardval}</p>
      </footer>
    </div>
  );
}
function CardButton({Cardval, CardSuit, Clickfunc}){
  // clube heart diamond spade
  // 0     1     2       3 

  // J  Q  K  A
  // 11 12 13 14
  function getsuite(val){
    if(val === 0){
      return Club;
    }
    if(val === 1){
      return Heart;
    }    
    if(val === 2){
      return Diamond;
    }    
    if(val === 3){
      return Spade;
    }
    if(val === 4){
      return Blank;
    }
  }
  function checkforFaceCard(val){
    if(typeof val === "string"){
      return val;
    }
    if(val < 11){
      return val;
    }
    let suitels = ["J", "Q", "K", "A"]
    return suitels[val-11];
  }  
  function buttontest(){
    alert("hi");
  }
  const [suit, setsuit] = useState(getsuite(CardSuit));

  Cardval = checkforFaceCard(Cardval);

  return(
    <button className='CardButton' onClick={Clickfunc}>
      <header className='CardTextTop'>
        <p>{Cardval}</p>
        <img src={suit} alt='icon' className='CardSuitsTop'/>
      </header>

      <footer className='CardTextBot'>
        <img src={suit} accessKey='icon' className='CardSuitsBot'/>
        <p>{Cardval}</p>
      </footer>
    </button>
  );
}




//CardlistTOwebhook with deck already in
function Fulldeck(){
  let currdeck = makeDeck();
  currdeck = getRand(currdeck, currdeck.length)
  let cardel = [];
  for (let c = 0; c < currdeck.length; c++) {
    let currcard = currdeck[c];
    cardel.push((<Card key={currcard} Cardval={currcard[0]} CardSuit={currcard[1]}/>));
  }
  return (<>{cardel}</>);
}  

function CardlistTOwebhook({ls}){
  let cardElements = [];
  for (let c = 0; c < ls.length; c++) {
    let currcard = ls[c];
    cardElements.push((<Card key={currcard} Cardval={currcard[0]} CardSuit={currcard[1]}/>));
  }
  
  return (
    <>{cardElements}</>
  );
}

//init
var currdeck = getRand(makeDeck(), 52);
var parcurcard = 2;
var finishgame = false;


// clube heart diamond spade
// 0     1     2       3 
export default function Blackjack() {
  const [resetval, setcurr] = useState(-1);


  function getcurrhand(){
    let currhand = 0;
    for (let i = 0; i < parcurcard; i++) {
      let el = currdeck[i][0];
      if (el === 14){currhand += 11;continue;}
      if (el > 10){currhand += 10;continue;}
      currhand += el;
    }
    return currhand;
  }
  function checkforwin(){
    var currhand = getcurrhand();

    console.log(currhand);
    console.log("who won");
    if(currhand === 21){
      console.log("you win");
      return;
    }
    if(currhand > 21){
      console.log("you busted");
      return;
    }
    if(currhand < 21){
      var opp = sum(getpartoflist(currdeck, parcurcard, Math.round((Math.random() * 3 ) + 2)));
      console.log(opp);
      if(opp < 22){
      if(opp > currhand){
        console.log("you lost");
      }if(opp === currhand){
        console.log("you tied")
      }if(opp < currhand){
        console.log("you won");
      }
      }else{console.log("you won")}
      return;
    }


  }
  function dealcard(){
    if(finishgame){return;}
    setcurr(parcurcard + 1);
    parcurcard++;
    var curhand = getcurrhand();
    if(curhand >= 21){
      checkforwin();
      finishgame = true;
    }
    
  }
  function holdcards(){
    if(finishgame === true){return;}
    checkforwin();
    finishgame = true;
  }
  function reset(){
    currdeck = getRand(makeDeck(), 52);
    parcurcard = 2;
    finishgame = false;
    setcurr(Math.random());    
  }
  //check for win oth move 
  if(getcurrhand() === 21){
    checkforwin();
    finishgame = true; 
  }


  return (
    <div className="App">
      <header className="App-header">
        <CardButton Cardval={"reset"} CardSuit={4} Clickfunc={() => reset()}></CardButton> 
        <CardButton Cardval={"hold"} CardSuit={4} Clickfunc={() => holdcards()} />
        <CardButton Cardval={"deal"} CardSuit={4} Clickfunc={() => dealcard()} />
        <CardlistTOwebhook ls={getpartoflist(currdeck, 0, parcurcard)}/>
      
      
      </header>
    </div>
  );
}
