import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { readCard, readDeck, updateCard } from "../utils/api";
import { useHistory } from "react-router-dom";


export default function EditCard(){
    let {deckId} = useParams()
    const {cardId} = useParams()
    const history = useHistory()

    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const [deckName, setDeckName] = useState("")
    const [importedCardId, setImportedCardId] = useState()
   

    const handleFrontChange = (event) => setFront(event.target.value);
    const handleBackChange = (event) => setBack(event.target.value);

    
    useEffect(() => {
        async function loadDeck(){
        const response = await readDeck(deckId);
        setDeckName(response.name);
    }
    loadDeck()
    }, [])

    useEffect(()=>{
        async function loadCard(){
            const response = await readCard(cardId);
            setFront(response.front);
            setBack(response.back);
            setImportedCardId(response.cardId)
        }
        loadCard()
    }, [])

    const HandleSubmit = (event) => {
        event.preventDefault();
        const id = +cardId
        deckId = Number(deckId)
        const updatedCard = {id, front, back, deckId}
        event.preventDefault()
        async function callUpdateCard(){
            try{
            const response = await updateCard(updatedCard);
            setFront(response.front)
            setBack(response.back)
            setImportedCardId(response.cardId)
            history.push(`/decks/${deckId}`)
        }
        catch(error) {
            throw error
        }
    }
    callUpdateCard();
}



return(
    <React.Fragment>
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deckName}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
        </ol>
    </nav>


<h4>{`${deckName}: Add Card`}</h4>
<form onSubmit={HandleSubmit}>
    <div className="form-group">
    <label htmlFor="front">
        Front
        <br></br>
        <textarea 
        className="form-control"
        id="front" 
        name="front" 
        placeholder="Front side of card"
        value={front}
        onChange={handleFrontChange}
         />
    </label>
    </div>

    <div>
    <label htmlFor="back">
        Back
        <br></br>
        <textarea
        className="form-control"
         id="back" 
         name="back" 
         placeholder="Back side of the card" 
         value={back}
         onChange={handleBackChange}
         />
    </label>

    <br></br>

    <Link to={`/decks/${deckId}`}><button type="button" className="btn btn-secondary">
        Cancel</button></Link>
    
    {" "}

    <button type="submit" className="btn btn-primary">Save</button>
    </div>
</form>
</React.Fragment>
)
}