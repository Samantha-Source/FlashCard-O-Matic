import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";


// Add Card page
export default function AddCard(){
    const [deckName, setDeckName] = useState();
    const [returnedDeckId, setReturnedDeckId] = useState();
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");

    const {deckId} = useParams();

    // Change handlers for input fields
    const handleFrontChange = (event) => setFront(event.target.value);
    const handleBackChange = (event) => setBack(event.target.value);
    

    //Read Deck
    useEffect(() => {
        async function loadDeck(){
        const response = await readDeck(deckId);
        setDeckName(response.name);
        setReturnedDeckId(response.id)
    }
    loadDeck()
    }, [deckId])

    // Form Submit Handler
    const HandleSubmit = (event) => {
        event.preventDefault();
        const card = {front, back}
        const deckId = returnedDeckId
        
        async function callCreateCard(){
            try{
                const cardInfo = await createCard(deckId, card);
                window.location.reload(false);   
            }
            catch (error) {
                throw error
            }
        } 
        callCreateCard()
    }


    return(

        <React.Fragment>
            {/* BREADCRUMB NAV BAR */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deckName}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>

        <h4>{`${deckName}: Add Card`}</h4>
       
        {/* THE FORM */}
        <CardForm 
        HandleSubmit={HandleSubmit}
        handleFrontChange={handleFrontChange}
        handleBackChange={handleBackChange}
        deckId={deckId}
        front={front}
        back={back}
        save="Save"
        cancel="Done"
        />
        
        </React.Fragment>
    )
}