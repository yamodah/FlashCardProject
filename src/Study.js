/*
Study

`/decks/:deckId/study`

allows the user to study the cards from a specified deck


*/
import React from "react";
import { useState,useEffect } from "react";
import {Link,useParams} from "react-router-dom";
import { readDeck } from "./utils/api";
function Study(){
    const [deck,setDeck]=useState({})
    const {deckId} = useParams()
    // const ac = new AbortController()
    

    useEffect(()=>{
        const loadDeck = ()=>{
            readDeck(deckId).then(setDeck)
        }
        loadDeck()
    },[deckId])
    console.log(deck)
return <div><nav aria-label="breadcrumb">
<ol className="breadcrumb">
  <li className="breadcrumb-item"><Link to="/">Home</Link></li>
  <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
  <li className="breadcrumb-item active" aria-current="page">Study</li>
</ol>
</nav>
<h2 className="display-4">Study</h2></div>
}

export default Study