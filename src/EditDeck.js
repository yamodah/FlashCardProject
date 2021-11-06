/*
Edit Deck
`/decks/:deckId/edit`
allows the user to modify information on an existing deck
*/
import React, {useEffect, useState} from "react";
import { useParams,Link,useHistory } from "react-router-dom";
import {readDeck, updateDeck} from "./utils/api/index"

function EditDeck({setDeck,deck}){
    const {deckId} = useParams()
    const history = useHistory()
    const initialFormState ={
        name:deck.name,
        description:deck.description,
    }

    //populate the form input boxes with our intiial formState 
    // which in turn is populated by the deck that is passed into
    //the component as well as set with the useEffect 
    const [formData, setFormData] = useState(initialFormState)
    useEffect(()=>{
        const ac = new AbortController()
        readDeck(deckId, ac.signal).then((CorrectDeck)=>{
            setDeck(CorrectDeck)
            (setFormData({...CorrectDeck}))
        }).catch(console.error)
        return () => ac.abort()
    },[deckId,setDeck])

    //gerneric handle change function
    const handleChange = ({ target }) => {
        setFormData({
          ...deck,
          [target.name]: target.value,
        });
      };

    //upon submission we update the deck and then push the user to the newUpdated deck's url 
      const handleSubmission =(event)=>{
          event.preventDefault()
          const ac = new AbortController()
          updateDeck(formData,ac.signal).then((newDeck)=>history.push(`/decks/${newDeck.id}`)).catch(console.error)
          return () => ac.abort()
      }
      const cancelHandler =()=>{
        history.push("/")
    }

return(
    <div>
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
        </ol>
        <form onSubmit={handleSubmission}>
            <div className="form-group">
                <label htmlFor="name" style={{width:"100%"}}><h6 style={{marginBottom:"10px"}}>Name</h6>
                <input type="text" className="form-control" id="name" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                </label>
            </div>
            <div className="form-group">
                <label htmlFor="description" style={{width:"100%"}}><h6 style={{marginBottom:"10px"}}>Description</h6>
                <textarea  className="form-control" id="decription" name="description" placeholder="description" value={formData.description} onChange={handleChange}/>
                </label>
            </div>
            <button type="submit" className="btn btn-secondary" style={{marginRight:"5px"}} onClick={cancelHandler}>Cancel</button>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>)
}

export default EditDeck