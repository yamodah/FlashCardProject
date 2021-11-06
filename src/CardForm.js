import React,{useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom"
import {updateCard , createCard} from "./utils/api/index"

function CardForm ({card, deck,newCard}){
    const {deckId} = useParams()
    const history = useHistory()
    const  initialFormState = !newCard ? {...card}:{front:"",back:""}
    const [formData, setFormData] = useState({...initialFormState})
    
    useEffect(()=>{
        setFormData({...card})
    },[card])

    const cancelHandler =()=>{
        history.push(`/decks/${deckId}`)
    }
    const submitHandler =(event)=>{
        event.preventDefault()
        const ac = new AbortController()
        if(newCard){
            createCard(deckId,formData,ac.signal).then(()=>history.push(`/decks/${deck.id}`)).catch(console.error)

        } else{
            updateCard(formData,ac.signal).then(()=>history.push(`/decks/${deck.id}`)).catch(console.error)
  
        }
        return () => ac.abort()
    }
    const handleChange = ({ target }) => {

        setFormData({
          ...formData,
          [target.name]: target.value,
        });
      };

    return ( <form onSubmit={submitHandler}>
        <div className="form-group">
            <label htmlFor="front" style={{width:"100%"}}><h6 style={{marginBottom:"10px"}}>Front</h6>
            <textarea className="form-control" id="front" name="front"  value={formData.front} onChange={handleChange} />
            </label>
        </div>
        <div className="form-group">
            <label htmlFor="back" style={{width:"100%"}}><h6 style={{marginBottom:"10px"}}>Back</h6>
            <textarea  className="form-control" id="back" name="back"  value={formData.back} onChange={handleChange}/>
            </label>
        </div>
        <button type="submit" className="btn btn-secondary" style={{marginRight:"5px"}} onClick={cancelHandler}>Cancel</button>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>)
}

export default CardForm