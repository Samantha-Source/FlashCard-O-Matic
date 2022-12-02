import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { deleteCard, deleteDeck, readDeck } from "../utils/api";


//View Deck Page
export default function Deck(params){
    const [cards, setCards] = useState([]); 
    const [deckName, setDeckName] = useState("")
    const [deckDescription, setDeckDescription] = useState("")
 
    const history = useHistory()   
    const {deckId} = useParams();

    
    // Read deck
    useEffect(()=>{
        async function allCards(){
            const response = await readDeck(`${deckId}`);
            setCards(response.cards);
            setDeckName(response.name);
            setDeckDescription(response.description);
        }
        allCards();
    }, []);

    // Delete Deck Handler
    const DeleteDeckHandler = (deckId) => {          
        if(window.confirm("Delete this deck? \n \nYou will not be able to recover it.")) {
            deleteDeck(deckId);
            history.push("/"); 
            window.location.reload(false);  
        }
    }

    // Delete Card Hanlder
    const DeleteCardHandler = (id) => {
        if(window.confirm("Delete this card? \n \n You will not be able to recover it.")) {
            deleteCard(id)
            window.location.reload(false);
        }
    }



    //Set the formatting for each card
    const theCards = cards.map(({front, back, id, deckId}, index )=>(
        <section key={index} className="border rounded p-2">
            <div className="d-flex flex-row justify-content-between">
            <p>{front}</p>
            <p>{back}</p>
            </div>

            <Link to={`/decks/${deckId}/cards/${id}/edit`}>
                <button type="button" className="btn btn-secondary">
                <span className="oi oi-pencil"></span> {" "}
                Edit
                </button>
                </Link>
                {" "}
                <button type="button"
                 className="btn btn-danger float-right" 
                onClick={() => {DeleteCardHandler(id)}}
                 >
            <span className="oi oi-trash"></span>
            {" "} Delete
            </button>
        </section>
    ))
    

    return(
        <React.Fragment>
            {/* BREADCRUMB HEADER */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{deckName}</li>
                </ol>
            </nav>

            <section>
                <h4>{deckName}</h4>
                <p>{deckDescription}</p>

                <Link to={`/decks/${deckId}/edit`}>
                <button type="button" className="btn btn-secondary">
                <span className="oi oi-pencil"></span>
                {" "} Edit
                </button>
                </Link>
                {" "}
                <Link to={`/decks/${deckId}/study`}>
                <button type="button" className="btn btn-primary">
                <span className="oi oi-book"></span>
                {" "} Study
                </button>
                </Link>
                {" "}
                <Link to={`/decks/${deckId}/cards/new`}>
                <button type="button" className="btn btn-primary">
                <span className="oi oi-plus"></span>
                {" "} Add Cards
                </button>
                </Link>
                {" "}
                
                
                <button 
                type="button" 
                className="btn btn-danger float-right" 
                onClick={() => {DeleteDeckHandler(deckId)}}
                ><span className = "oi oi-trash"></span>
                Delete</button>
                

            </section>
            <br></br>

            <h2>Cards</h2>

        <ul>
            {theCards}
        </ul>

        </React.Fragment>
    )

}