/*Home

`/`

shows a list of decks with options to create, study, view, or delete a deck

*/
import React from "react";
import {Link} from "react-router-dom"
function Home(){
return <Link to="/decks/new"type="button" className="btn btn-secondary">Create Deck</Link>
}

export default Home