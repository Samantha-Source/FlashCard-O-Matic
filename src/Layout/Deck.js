import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { readDeck } from "../utils/api";


export default function Deck(params){
    const [cards, setCards] = useState([]); 
    const [deckName, setDeckName] = useState("")
    const [deckDescription, setDeckDescription] = useState("")
    
    const deckId = useParams();
    const ID = deckId.deckId
//    console.log(cards)
    

    useEffect(()=>{
        async function allCards(){
            const response = await readDeck(`${ID}`);
            setCards(response.cards)
            console.log(response.name)
            setDeckName(response.name);
            setDeckDescription(response.description)
        }
        allCards()
    }, [])
    

    //SET THE CARD VIEWS FOR THE PAGE DOWN HERE (IT DOESNT DO THAT RIGHT NOW)
    const theCards = cards.map(({front, back}, index )=>(
        <section key={index} class="border">
            <p>Front: {front}</p>
            <p>Back: {back}</p>
            <Link to="/decks/new">
                <button type="button" className="btn btn-secondary">
                Edit(Right now goes to new)</button>
                </Link>

                <Link to="/decks/new">
                <button type="button" className="btn btn-secondary">
                Delete(Right now goes to new)</button>
                </Link>
        </section>
    ))
    



    return(
        <React.Fragment>
        
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">{deckName}</li>
                </ol>
            </nav>

            <section>
                <h4>{deckName}</h4>
                <p>{deckDescription}</p>

                <Link to="/decks/new">
                <button type="button" className="btn btn-secondary">
                Edit(Right now goes to new)</button>
                </Link>
                {" "}
                <Link to={`/decks/${ID}/study`}>
                <button type="button" className="btn btn-secondary">
                Study</button>
                </Link>
                {" "}
                <Link to="/decks/new">
                <button type="button" className="btn btn-secondary">
                + Add Cards(Right now goes to new)</button>
                </Link>
                {" "}
                <Link to="/decks/new">
                <button type="button" className="btn btn-secondary">
                Delete(Right now goes to new)</button>
                </Link>

            </section>
            <br></br>

            <h2>Cards</h2>




        <ul>
            {theCards}
        </ul>

        </React.Fragment>
    )
    
    
    
    
    
    return(
        <p>DECK PAGE</p>
    )
}