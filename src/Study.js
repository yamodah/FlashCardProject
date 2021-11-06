/*
Study

`/decks/:deckId/study`

allows the user to study the cards from a specified deck


*/
import React, { useState,useEffect } from "react";
import {Link,useParams,useHistory} from "react-router-dom";
import { readDeck } from "./utils/api";


function Study({deck,setDeck,currentCardIndex,setCurrentCardIndex}){
    const {cards} = deck
    const [cardFace, setCardFace]= useState("front")
    const {deckId} = useParams()
    const history = useHistory()

    //cleans up prior deck and loads new one
    //deckId is accessed via the url params
    useEffect(()=>{
        const ac = new AbortController()
        setDeck({cards:[]})
        const loadDeck = ()=>{
            readDeck(deckId).then((theDeck)=>setDeck(theDeck)).catch(console.error)
        }
        loadDeck()
        return ()=>ac.signal
    },[deckId,setDeck])
    
    const flipHandler = () => cardFace === "front"? setCardFace("back"): setCardFace("front")

    //currentCardIndex comes in handy here without having to access each cards id
    //we can start we a index of 0 and keep adding till 
    //the index is eqaul to the length - 1 of the cards array 
    //then we ask the user what they wish to do restart the same deck 
    //if they say no we  send them home otherwise set the currentCardIndex to 0 
    const handleNext = () => {
        if(currentCardIndex < cards.length-1){
            setCurrentCardIndex((currentCardIndex)=>currentCardIndex+1)
            setCardFace("front")
        }else{
            if(window.confirm(`Would you like to start ${deck.name} over again ? Otherwise press cancel to head back to the Home screen.`)){
                setCurrentCardIndex(0)
                setCardFace("front")
            }else{
                history.push("/")
            }
        }
    }
    //consditionla to render a loading screen until the deck is set 
if(!deck.name)return <h5>loading...</h5>

    //conditional to handle a deck that is too small to study (per the requirements)
if(deck.cards.length<3){
    return(
        <div>
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Study</li>
            </ol>
            </nav>
            <h4>{`${deck.name}:`}Study</h4>
            <h5>Not enough Cards.</h5>
            <p>cmon mate you need at least 3 cards to call this "studying"... there are only {deck.cards.length} cards in this deck.</p>
            <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary" style={{margin:"10px 5px 10px 5px"}}>Add Cards</Link> 
        </div>
    )
}

//don't intiatlize card varilable until deck is set so we do this under the conditional
const card = deck.cards[currentCardIndex]
return (<div><nav aria-label="breadcrumb">
<ol className="breadcrumb">
  <li className="breadcrumb-item"><Link to="/">Home</Link></li>
  <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
  <li className="breadcrumb-item active" aria-current="page">Study</li>
</ol>
</nav>
<h2 style={{textAlign:"center"}}>Study: {deck.name}</h2>
{<div key={card.id}className="card" style={{width:"100%"}}><div className="card-body">
    <h5 style={{marginBottom:"15px"}}>Card {currentCardIndex+1} of {cards.length}</h5>
    <p className="card-text" style={{fontSize:"18", textAlign:"center"}}>{cardFace==="front"?card.front:card.back}</p></div>
    <div style={{display:"flex"}}>
    <button onClick={flipHandler} className="btn btn-secondary" style={{margin:"10px 0px 10px 15px"}}>Flip</button>
   {cardFace==="back" && <button onClick={handleNext}className="btn btn-primary" style={{margin:"10px 5px 10px 5px"}}>Next</button>}
   </div>
 </div>}
</div>)
}

export default Study