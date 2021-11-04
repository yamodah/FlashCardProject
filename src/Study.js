/*
Study

`/decks/:deckId/study`

allows the user to study the cards from a specified deck


*/
import React from "react";
import { useEffect } from "react";
import {Link,useParams} from "react-router-dom";
import { readDeck } from "./utils/api";


function Study({deck,setDeck}){
    const {deckId} = useParams()
    useEffect(()=>{
        const ac = new AbortController()
        const loadDeck = ()=>{
            readDeck(deckId).then((theDeck)=>setDeck(theDeck))
        }
        loadDeck()
        return ()=>ac.signal
    },[deckId,setDeck])
    //console.log(deck)


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
<h4>Study: {deck.name}</h4>

</div>)
}

export default Study