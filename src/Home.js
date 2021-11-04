/*Home

`/`

shows a list of decks with options to create, study, view, or delete a deck

*/
import React,{ useEffect,useState } from "react";
import {Link} from "react-router-dom"
import {listDecks} from "./utils/api/index.js"
function Home(){
    const [decks,setDecks]=useState([])
    
    useEffect(()=>{
        const ac = new AbortController()
        const loadDecks = ()=>{
            listDecks().then(setDecks).catch(console.error)
        }
        loadDecks()
        return ()=>ac.signal
    },[])

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
    <button className="btn btn-danger" style={{margin:"10px 10px 10px auto"}}>Delete</button>
   </div>
 </div>))
 

if(decks.length < 1){
    return (<div>
        <p>Chill we loading the decks...</p>
     <Link to="/decks/new"type="button" className="btn btn-secondary">Create Deck</Link>
     </div>)
}
return (
<div>
<Link to="/decks/new"type="button" className="btn btn-secondary" style={{marginBottom:"15px"}}>Create Deck</Link>
  {decksHTML}
</div>
)
}

export default Home


//