/*Home

`/`

shows a list of decks with options to create, study, view, or delete a deck

*/
import React,{ useEffect } from "react";
import {Link} from "react-router-dom"
import {listDecks, deleteDeck} from "./utils/api/index.js"
function Home({decks,setDecks}){
    //loading loading the decks array from the api 
    useEffect(()=>{
        const ac = new AbortController()
        setDecks([])
        const loadDecks = ()=>{
            listDecks(ac.signal).then(setDecks).catch(console.error)
        }
        loadDecks()
        return ()=>ac.abort()
    },[setDecks])

    const deleteDeckHandler = ({target:{id}}) =>{
        const ac =  new AbortController()
        
        if(window.confirm("Are you sure you want to delete this deck ? This cannot be undone.")){
            
            deleteDeck(id,ac.signal).catch(console.error)
            listDecks().then(setDecks).catch(console.error)
        }
        return ()=>ac.abort()
    }

    // mapping of decks array 
    //by accessing each deck individually we have acces to info needed to constrcut a card with info 
    //relating to the specific deck
   const decksHTML = decks.map((deck)=>(
   <div key={deck.id}className="card" style={{width:"100%"}}><div className="card-body">
    <div style={{display:"flex"}}>
        <h4 className="card-title">{deck.name}</h4>
        <p style={{margin:"10px 10px 10px auto"}} className="text-muted">{deck.cards.length} cards</p>
    </div>   
    <p className="card-text">{deck.description}</p></div>
    <div style={{display:"flex"}}>
    <Link to={`/decks/${deck.id}`}type="button" className="btn btn-secondary" style={{margin:"10px 0px 10px 15px"}}>View</Link>
    <Link to={`/decks/${deck.id}/study`} className="btn btn-secondary" style={{margin:"10px 5px 10px 5px"}}>Study</Link>
    <button id={deck.id} key={deck.id} className="btn btn-danger" style={{margin:"10px 10px 10px auto"}} onClick={deleteDeckHandler}>Delete</button>
   </div>
 </div>))
 
//conditional to check decks array has not loaded 
// if it hasnt user will see a laoding screen
if(decks.length < 1){
    return (<div>
        <p>Chill we loading the decks...</p>
     <Link to="/decks/new"type="button" className="btn btn-secondary">Create Deck</Link>
     </div>)
}
return (
<div style={{marginBottom:"50px"}}>
<Link to="/decks/new"type="button" className="btn btn-secondary" style={{marginBottom:"15px"}}>Create Deck</Link>
  {decksHTML}
</div>
)
}

export default Home


//