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
    if(val === 1){return "A";}
    if(val < 11){
      return val;
    }
    let suitels = ["J", "Q", "K", "A"]
    return suitels[val-11];
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
//var currdeck = getRand(makeDeck(), 52);
var currdeck = [[14,1], [14,2], [10, 1], [9, 1],[9, 1], [1, 1], [9, 1], [1, 1],[9, 1], [1, 1]];
var parcurcard = 2;
var finishgame = false;
var whowon = '';



// clube heart diamond spade
// 0     1     2       3 
function Blackjack() {
  const [resetval, setcurr] = useState(2);


  function getcurrhand(){
    let currhand = 0;
    let numofacc = 0;
    for (let i = 0; i < parcurcard; i++) {
      let el = currdeck[i][0];
      if (el === 14){currhand += 11;numofacc++;continue;}
      if (el > 10){currhand += 10;continue;}
      currhand += el;
    }
    for (let i = 0; i < numofacc; i++) {
      if(numofacc > 0 && currhand > 21)
      {
        currhand -= 10;
      }else{break;}
    }
    return currhand;
  }
  function checkforwin(currhand){

    console.log(currhand);
    console.log("who won");

    var opp = sum(getpartoflist(currdeck, parcurcard, 2));

    if(opp < Math.round((Math.random() * 6)) + 0){
      opp = sum(getpartoflist(currdeck, parcurcard, 5)); 
    }
    else{
    if(opp < Math.round((Math.random() * 4)) + 12){
      opp = sum(getpartoflist(currdeck, parcurcard, 4)); 
    }
    else{
    if(opp < Math.round((Math.random() * 6)) + 15){
      opp = sum(getpartoflist(currdeck, parcurcard, 3)); 
        }
      }
    }


    if(currhand === 21){
      whowon = "you won";
      console.log("you won");
    }
    if(currhand > 21){
      whowon = "you busted";
      console.log("you busted");
    }
    if(currhand < 21){
      console.log(opp);
      if(opp < 22){
      if(opp > currhand){
        whowon = "you lost";
        console.log("you lost");
      }if(opp === currhand){
        whowon = "you tied";
        console.log("you tied")
      }if(opp < currhand){
        whowon = "you won";
        console.log("you won");
      }
      }else{whowon = "you win";console.log("you won");}
    }

    whowon = whowon + " " + currhand + " vs " + opp;
    alert(whowon);
    setcurr(Math.random());

  }
  function dealcard(){
    if(finishgame){return;}
    
    parcurcard++;
    var curhand = getcurrhand();
    if(curhand >= 21){
      checkforwin(curhand);
      finishgame = true;
      return;
    }
    setcurr(Math.random());
  }
  function holdcards(){
    if(finishgame === true){return;}
    var curhand = getcurrhand();
    checkforwin(curhand);
    finishgame = true;
  }
  function reset(){
    currdeck = getRand(makeDeck(), 52);
    parcurcard = 2;
    finishgame = false;
    whowon = '';
    setcurr(Math.random());    
  }


  return (
      <>
        <div className='options'>
          <CardButton Cardval={"reset"} CardSuit={4} Clickfunc={() => reset()}></CardButton> 
          <CardButton Cardval={"hold"} CardSuit={4} Clickfunc={() => holdcards()} />
          <CardButton Cardval={"deal"} CardSuit={4} Clickfunc={() => dealcard()} />
          <CardButton Cardval={whowon} CardSuit={4}></CardButton>
        </div>
        <div className='currcards'>
          <CardlistTOwebhook ls={getpartoflist(currdeck, 0, parcurcard)}/>
        </div>

      </>
  );
}

export default function App(){



  return (
    <div className="App">
      <header className="App-header">

        <Blackjack />

      </header>
    </div>
  );
}




