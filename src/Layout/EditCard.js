import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";
import CardForm from "./CardForm";

// Edit card Page
export default function EditCard(){
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const [deckName, setDeckName] = useState("")

    let {deckId} = useParams()
    const {cardId} = useParams()
    const history = useHistory()


    const [importedCardId, setImportedCardId] = useState()
   
    //change handlers for input fields
    const handleFrontChange = (event) => setFront(event.target.value);
    const handleBackChange = (event) => setBack(event.target.value);

    //load the current deck
    useEffect(() => {
        async function loadDeck(){
        const response = await readDeck(deckId);
        setDeckName(response.name);
    }
    loadDeck()
    }, [])

    //load the current card data
    useEffect(()=>{
        async function loadCard(){
            const response = await readCard(cardId);
            setFront(response.front);
            setBack(response.back);
            setImportedCardId(response.cardId)
        }
        loadCard()
    }, [])

    //Submit handler
    const HandleSubmit = (event) => {
        event.preventDefault();
        const id = +cardId
        deckId = Number(deckId)
        const updatedCard = {id, front, back, deckId}
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
    {/* BREADCRUMB NAV BAR */}
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deckName}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
        </ol>
    </nav>

    {/* THE FORM */}
    <h4>{`Edit Card`}</h4>

    <CardForm 
    HandleSubmit={HandleSubmit}
    handleFrontChange={handleFrontChange}
    handleBackChange={handleBackChange}
    deckId={deckId}
    front={front}
    back={back}
    />
    {/* <form onSubmit={HandleSubmit}>
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
</form> */}
</React.Fragment>
)
}