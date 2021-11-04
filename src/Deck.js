/*
Deck

`/decks/:deckId`

shows all of the information about a specified deck with options to edit or add cards to the deck, navigate to the study screen, or delete the deck


*/
import React from "react";
import { useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import { readDeck } from "./utils/api";

function Deck({deck ,setDeck}){

    const {deckId} = useParams()
    useEffect(()=>{
        const ac = new AbortController()
        const loadDeck = ()=>{
            readDeck(deckId).then((theDeck)=>setDeck(theDeck))
        }
        loadDeck()
        return ()=>ac.signal
    },[deckId,setDeck])

    
   const cardsHTML = deck.cards.map((card)=>(
    <div key={card.id}className="card" style={{width:"100%"}}>
    <div className="card-body">
     <div style={{display:"flex", justifyContent:"space-between"}}>
         <div style={{width:"50%"}}>{card.back}</div>
         <div style={{width:"50%"}}>{card.front}</div>
     </div>   
     </div>
     <div style={{display:"flex", alignItems:"flex-end"}}>
     <div style={{margin:"10px 10px 10px auto"}}>  
     <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}type="button" className="btn btn-secondary" style={{marginRight:"5px"}}>EditCard</Link>
     <button className="btn btn-danger" >Delete</button>
     </div> 
    </div>
  </div>))



if(!deck.name)return <h5>loading...</h5>
return (<div><nav aria-label="breadcrumb">
<ol className="breadcrumb">
  <li className="breadcrumb-item"><Link to="/">Home</Link></li>
  <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
</ol>
</nav>
<h3>{`${deck.name}`}</h3>
<p className="lead">{deck.description}</p>
<div style={{display:"flex"}}>    
    <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary" style={{margin:"10px 5px 10px 5px"}}>Edit</Link>   
    <Link to={`/decks/${deck.id}/study`} className="btn btn-primary" style={{margin:"10px 5px 10px 5px"}}>Study</Link>   
    <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary" style={{margin:"10px 5px 10px 5px"}}>Add Cards</Link>  
    <button className="btn btn-danger" style={{margin:"10px 10px 10px auto"}}>Delete</button>    
</div>
<h3>Cards</h3>
{cardsHTML}
</div>)
}

export default Deck
