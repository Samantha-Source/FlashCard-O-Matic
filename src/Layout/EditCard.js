import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";
import CardForm from "./CardForm";

// Edit card Page
export default function EditCard(){
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const [deckName, setDeckName] = useState("")

    let {deckId} = useParams()  // using let for this in order to convert string to number in submit handler
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
        deckId = Number(deckId) // need to convert the string value to a number
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

    
    <h4>{`Edit Card`}</h4>
    
    {/* THE FORM */}
    <CardForm 
    HandleSubmit={HandleSubmit}
    handleFrontChange={handleFrontChange}
    handleBackChange={handleBackChange}
    deckId={deckId}
    front={front}
    back={back}
    cancel="Cancel"
    save="Submit"
    />
</React.Fragment>
)
}