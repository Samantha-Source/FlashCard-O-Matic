import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { deleteDeck, readDeck } from "../utils/api";
import DeleteDeckHandler from "./DeleteDeckHandler";
import { listDecks } from "../utils/api";



export default function Deck(params){
    const [cards, setCards] = useState([]); 
    const [deckName, setDeckName] = useState("")
    const [deckDescription, setDeckDescription] = useState("")
 
    
    const {deckId} = useParams();

    

    useEffect(()=>{
        async function allCards(){
            const response = await readDeck(`${deckId}`);
            setCards(response.cards)
            console.log(response.name)
            setDeckName(response.name);
            setDeckDescription(response.description)
        }
        allCards()
    }, [])


    

console.log(cards)
    //SET THE CARD VIEWS FOR THE PAGE DOWN HERE (IT DOESNT DO THAT RIGHT NOW)
    const theCards = cards.map(({front, back, id}, index )=>(
        <section key={index} class="border rounded p-2">
            <p>Front: {front}</p>
            <p>Back: {back}</p>
            <p>id: {id}</p>
            <p>deckId: {deckId}</p>
            <p>deck Name:</p>

            <Link to={`/decks/${deckId}/cards/${id}/edit`}>
                <button type="button" className="btn btn-secondary">
                <span class="oi oi-pencil"></span> {" "}
                Edit
                </button>
                </Link>
                {" "}
                {/* <Link to="/"> */}
                <button type="button"
                 class="btn btn-danger float-right" 
                //  onClick={DeleteDeckHandler({deckId})}
                 >
            <span className="oi oi-trash"></span>
            {" "} Delete
            </button>
        </section>
    ))
    



    return(
        <>
        
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">{deckName}</li>
                </ol>
            </nav>

            <section>
                <h4>{deckName}</h4>
                <p>{deckDescription}</p>

                <Link to={`/decks/${deckId}/edit`}>
                <button type="button" class="btn btn-secondary">
                <span className="oi oi-pencil"></span>
                {" "} Edit
                </button>
                </Link>
                {" "}
                <Link to={`/decks/${deckId}/study`}>
                <button type="button" class="btn btn-primary">
                <span className="oi oi-book"></span>
                {" "} Study
                </button>
                </Link>
                {" "}
                <Link to={`/decks/${deckId}/cards/new`}>
                <button type="button" class="btn btn-primary">
                <span className="oi oi-plus"></span>
                {" "} Add Cards
                </button>
                </Link>
                {" "}
                <Link to="/">
                <button 
                type="button" 
                className="btn btn-danger float-right" 
                
                >
                Delete(Right now goes to new)</button>
                </Link>

            </section>
            <br></br>

            <h2>Cards</h2>

        <ul>
            {theCards}
        </ul>

        </>
    )

}