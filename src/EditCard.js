/*
Edit Card

`/decks/:deckId/cards/:cardId/edit`

allows the user to modify information on an existing card
*/
import React, { useEffect} from "react";
import { useParams, Link} from "react-router-dom"
import {readCard, readDeck } from "./utils/api/index"
import EditCardForm from "./EditCardForm"
function EditCard({deck,setDeck,card,setCard}){

    const {cardId, deckId} = useParams()
    
    
    useEffect(()=>{
        const ac = new AbortController()
        readDeck(deckId, ac.signal).then(setDeck).catch(console.error)
        readCard(cardId, ac.signal).then((theCard)=>{
            setCard(theCard)
        })
        .catch(console.error)
        return ()=>ac.abort()
    },[setDeck, cardId,deckId, setCard])
   
    // useEffect(()=>{
    //     const ac = new AbortController()
    //     setCard({})
    //     readDeck(deckId, ac.signal).then((theDeck)=>setDeck(theDeck)).catch(console.error)
    //     readCard(cardId, ac.signal).then(setCard).catch(console.error)
    //     return ()=>ac.abort()
        
    // },[cardId,deckId,setDeck,setCard])
    

    if(!deck.id) return <h6>one moment please while we load your card...</h6>
    return  (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                {deck.name && <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>}
                <li className="breadcrumb-item active" aria-current="page">edit Deck</li>
            </ol>
            <EditCardForm  card={card} deck={deck} setCard={setCard}/>
        </div>)
}

export default EditCard