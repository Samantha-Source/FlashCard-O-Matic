import React from "react";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { readDeck } from "../utils/api";



export default function Study(params){
    const [cards, setCards] = useState([]);
    const [deckName, setDeckName] = useState("")
    
    const {deckId} = useParams();
    


    useEffect(()=>{
        async function allCards(){
            const response = await readDeck(`${deckId}`);
            setCards(response.cards)
            setDeckName(response.name)
        }
        allCards()
    }, [])
    
    const theCards = cards.map(({front, back}, index )=>(
        <section key={index}>
            <p>Front: {front}</p>
            <p>Back: {back}</p>
        </section>
    ))
    
    return(
        <React.Fragment>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deckName}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Study</li>
            </ol>
        </nav>

        <ul>
            {theCards}
        </ul>

        </React.Fragment>
    )
}