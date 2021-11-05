/*
Study

`/decks/:deckId/study`

allows the user to study the cards from a specified deck


*/
import React, { useState,useEffect } from "react";
import {Link,useParams} from "react-router-dom";
import { readDeck } from "./utils/api";


function Study({deck,setDeck}){
    const {cards} = deck
    const [currentCardIndex, setCurrentCardIndex] = useState(0)
    const [cardFace, setCardFace]= useState("front")
    const {deckId} = useParams()
    
    useEffect(()=>{
        const ac = new AbortController()
        const loadDeck = ()=>{
            readDeck(deckId).then((theDeck)=>setDeck(theDeck))
        }
        loadDeck()
        return ()=>ac.signal
    },[deckId,setDeck])
    console.log(cards[0])
    const flipHandler = () => cardFace === "front"? setCardFace("back"): setCardFace("front")
    const handleNext = () => {

    }
    const card = deck.cards[currentCardIndex]
if(!deck.name)return <h5>loading...</h5>
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
        </div>
    )
}
return (<div><nav aria-label="breadcrumb">
<ol className="breadcrumb">
  <li className="breadcrumb-item"><Link to="/">Home</Link></li>
  <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
  <li className="breadcrumb-item active" aria-current="page">Study</li>
</ol>
</nav>
<h2 style={{textAlign:"center"}}>Study: {deck.name}</h2>
{card.id && <div key={card.id}className="card" style={{width:"100%"}}><div className="card-body">
    <h5 style={{marginBottom:"15px"}}>Card {card.id} of {cards.length}</h5>
    <p className="card-text" style={{fontSize:"18", textAlign:"center"}}>{cardFace==="front"?card.front:card.back}</p></div>
    <div style={{display:"flex"}}>
    <button onClick={flipHandler} className="btn btn-secondary" style={{margin:"10px 0px 10px 15px"}}>Flip</button>
   {cardFace==="back" && <button className="btn btn-primary" style={{margin:"10px 5px 10px 5px"}}>Next</button>}
   </div>
 </div>}
</div>)
}

export default Study