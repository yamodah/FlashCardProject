/*
Add Card

`/decks/:deckId/cards/new`

allows the user to add a new card to an existing deck


*/
import React, {useState} from "react";
import {useHistory, useParams, Link} from "react-router-dom"
import {createCard} from "./utils/api/index"

function AddCard(){
    const initialFormState = {front:"",back:""}
    const [formData,setFormData] = useState(initialFormState)
    const history = useHistory()
    const {deckId} = useParams()
   
    
    const cancelHandler =()=>{
        history.push(`/decks/${deckId}`)
    }
    const submitHandler =(event)=>{
        event.preventDefault()
        const ac = new AbortController()
        createCard(deckId,formData,ac.signal).then(()=>history.push(`/decks/${deckId}`)).catch(console.error)
        return () => ac.abort()
    }
    const handleChange = ({ target }) => {
        setFormData({
          ...formData,
          [target.name]: target.value,
        });
      };

    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">edit Deck</li>
            </ol>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="front" style={{width:"100%"}}><h6 style={{marginBottom:"10px"}}>Front</h6>
                    <textarea className="form-control" id="front" name="front" placeholder="front of card" value={formData.front} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="back" style={{width:"100%"}}><h6 style={{marginBottom:"10px"}}>Back</h6>
                    <textarea  className="form-control" id="back" name="back" placeholder="back of card" value={formData.back} onChange={handleChange}/>
                    </label>
                </div>
                <button type="submit" className="btn btn-secondary" style={{marginRight:"5px"}} onClick={cancelHandler}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>)
}

export default AddCard