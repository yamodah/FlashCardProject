/*
Deck

`/decks/:deckId`

shows all of the information about a specified deck with options to edit or add cards to the deck, navigate to the study screen, or delete the deck


*/
import React from "react";
import { useEffect } from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import { readDeck ,deleteDeck, deleteCard } from "./utils/api";

function Deck({deck ,setDeck}){
    const history = useHistory()
    const {deckId} = useParams()

    //first cleans up any deck that mightve been set previously 
    //loads the deck based on the url params 
    useEffect(()=>{
        const ac = new AbortController()
        setDeck({cards:[]})
        const loadDeck = ()=>{
            readDeck(deckId,ac.signal).then((theDeck)=>setDeck(theDeck)).catch(console.error)
        }
        loadDeck()
        return ()=>ac.abort()
    },[deckId,setDeck])


   //warns user prior to delteing card 
   //we pass in card.id into the delete handler to target the specific card 
   //we want to delete without much fuss
    const deleteThisCardHandler = (cardToDelete) =>{
        const ac = new AbortController()
        if(window.confirm("Are you sure you want to delete this card ? This cannot be undone.")){
            deleteCard(cardToDelete,ac.signal).catch(console.error)
            readDeck(deckId).then(setDeck).catch(console.error)
        }
        return () => ac.abort()
    };

    //similar idea to the above delete handler minus the targeting
    // because there is only one deck we can delete from this page
    const deleteDeckHandler = () =>{
        const ac =  new AbortController()
        if(window.confirm("Are you sure you want to delete this deck ? This cannot be undone.")){

            deleteDeck(deck.id,ac.signal).catch(console.error)
            history.push("/")
        }
        return ()=>ac.abort()
    }
    //conditional to display a "loading screen" until the deck is set

if(!deck.name)return <h5>loading...</h5>

    // mapping to access the individual cards within the deck
    //once access we have all the info we need 
    //including the card.id for our delete handler
    // putting this above the conditional throws an error 
    //because we cannot access/map cards whose deck has not been defined
    //putting it after the conditional prevents the mapping until deck is set

const cardsHTML = deck.cards.map((card)=>(
    <div key={card.id} className="card" style={{width:"100%"}}>

    <div className="card-body">
     <div style={{display:"flex", justifyContent:"space-between"}}>
         <div style={{width:"50%"}}>{card.front}</div>
         <div style={{width:"50%"}}>{card.back}</div>
     </div>   
     </div>
     <div style={{display:"flex", alignItems:"flex-end"}}>
     <div style={{margin:"10px 10px 10px auto"}}>  
     <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}type="button" className="btn btn-secondary" style={{marginRight:"5px"}}>EditCard</Link>
     <button className="btn btn-danger" type="button" onClick={()=>deleteThisCardHandler(card.id)} >Delete</button>
     </div> 
    </div>
  </div>))

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
    <button className="btn btn-danger" style={{margin:"10px 10px 10px auto"}} onClick={deleteDeckHandler}>Delete</button>    
</div>
<h3>Cards</h3>
<div style={{marginBottom:"50px"}}>
    {cardsHTML}
</div>

</div>)
}

export default Deck
