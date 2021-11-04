/*
Create Deck

`/decks/new`

allows the user to create a new deck


*/
import React from "react";
import NavBar from "./NavBar";
import {useHistory} from "react-router-dom"

function CreateDeck(){
    const history = useHistory()
    const cancelHandler =()=>{
        history.push("/")
    }
    const submitHandler =()=>{
        
        history.push("/")
    }
    
    return (
        <div>
            <NavBar/>
            <h2 className="display-4">Create a Deck</h2>
            <button onClick={cancelHandler} className="btn btn-secondary m-2">Cancel</button>
            <button onClick={submitHandler} className="btn btn-secondary">Submit</button>
        </div>)
}

export default CreateDeck