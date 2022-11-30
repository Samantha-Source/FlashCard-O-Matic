import React from "react";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import { useHistory } from "react-router-dom";



export default function Study(params){
    const [cards, setCards] = useState([]);
    const [deckName, setDeckName] = useState("");
    const [front, setFront] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0)
    const [display, setDisplay] = useState();
    
    const {deckId} = useParams();
    const history = useHistory();
    

    // Read Deck
    useEffect(()=>{
        async function allCards(){
            const response = await readDeck(`${deckId}`);
            setCards(response.cards)
            setDeckName(response.name)
        }
        allCards()
    }, [])
    


    //Map the cards
    // const theCards = cards.map((card, index )=>(
    //     <section key={index} className="border rounded">
    //         <h5>Card {index+1} of {cards.length}</h5>
    //         <p>Index: {index}</p>
    //         <p>Front: {card.front}</p>
    //         <p>Back: {card.back}</p>
    //         <button type="button" className="btn btn-secondary">Flip</button> {" "}
    //         <button type="button" className="btn btn-primary">Next</button>
    //     </section>
    // ))

    //OR MAP THEM LIKE THIS?
    const eachCard = cards.map((card, index) =>(
        {"index":index, "front":card.front, "back":card.back }
    ))


    //Show this if less than 3 cards
    if(cards.length < 3){
        return (
            <React.Fragment>
            {/* BREADCRUMB NAV BAR */}
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deckName}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Study</li>
            </ol>
        </nav>
        <h3>{deckName}: Study</h3>
        <h4>Not enough cards.</h4>
        <p>You need at least 3 cards to study.  There are {cards.length} cards in this deck.</p>
        <button type="button" className="btn btn-primary" onClick={(()=>{history.push(`/decks/${deckId}/cards/new`)})}>
            <span className="oi oi-plus"></span>
            {/* <Link to={`/decks/${deckId}/cards/new`}
            Add Cards></Link> */}
            {" "}Add Cards
        </button>
        </React.Fragment>
        )
    }
    


 

    
    return(
        <React.Fragment>
            {/* BREADCRUMB NAV BAR */}
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deckName}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Study</li>
            </ol>
        </nav>
        <h3>{deckName}: Study</h3>


        <div>
            {display}
        </div>
        {/* THE CARDS  */}
        {/* <ul>
            {theCards}
        </ul> */}

        </React.Fragment>
    )
}