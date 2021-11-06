import React,{useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom"
import {updateCard , createCard} from "./utils/api/index"

//handles both adding and editing cards 
//(only becuase of the project requirements other wise this kind of seems like an unneeded combination that only makes things messy)
function CardForm ({card, deck,newCard}){
    const {deckId} = useParams()
    const history = useHistory()
    const  initialFormState = !newCard ? {...card}:{front:"",back:""}
    const [formData, setFormData] = useState({...initialFormState})

    //either populates the form or empties the form
    //depending on if card is set to an actual card 
    //or just an empty object
    useEffect(()=>{
        setFormData({...card})
    },[card])

    const cancelHandler =()=>{
        history.push(`/decks/${deckId}`)
    }

    //if the card is new want to create a card 
    //if its not new we just want to update an already existing card
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

    //generic handle change function
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