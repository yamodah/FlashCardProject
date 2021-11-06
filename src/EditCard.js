/*
Edit Card

`/decks/:deckId/cards/:cardId/edit`

allows the user to modify information on an existing card
*/
import React, { useEffect} from "react";
import { useParams, Link} from "react-router-dom"
import {readCard, readDeck } from "./utils/api/index"
import CardForm from "./CardForm"
function EditCard({deck,setDeck,card,setCard}){

    const {cardId, deckId} = useParams()
    const newCard = false
    
    // here we set the deck based on the deckId param in the url 
    // as well as set the card based on the cardId param in the url
    useEffect(()=>{
        const ac = new AbortController()
        readDeck(deckId, ac.signal).then(setDeck).catch(console.error)
        readCard(cardId, ac.signal).then((theCard)=>{
            setCard(theCard)
        })
        .catch(console.error)
        return ()=>ac.abort()
    },[setDeck, cardId,deckId, setCard])
   
    
    //handlees loading sscreen while deck is set
    if(!deck.id) return <h6>one moment please while we load your card...</h6>
    return  (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                {deck.name && <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>}
                <li className="breadcrumb-item active" aria-current="page">edit Deck</li>
            </ol>
            <CardForm  card={card} deck={deck} newCard={newCard}/>
        </div>)
}

export default EditCard