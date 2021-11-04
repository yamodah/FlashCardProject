/*
Create Deck

`/decks/new`

allows the user to create a new deck


*/
import React from "react";

import {useHistory,Link} from "react-router-dom"

function CreateDeck(){
    const history = useHistory()
    // const {deckId} = useParams()
    const cancelHandler =()=>{
        history.push("/")
    }
    const submitHandler =()=>{
        
        history.push("/")
    }
    
    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
            </ol>
            <h2 className="display-4">Create a Deck</h2>
            <button onClick={cancelHandler} className="btn btn-secondary m-2">Cancel</button>
            <button onClick={submitHandler} className="btn btn-secondary">Submit</button>
        </div>)
}

export default CreateDeck