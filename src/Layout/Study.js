import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import { useHistory } from "react-router-dom";




export default function Study(params){
    const [cards, setCards] = useState([]);
    const [deckName, setDeckName] = useState("");
    const [front, setFront] = useState(false);
    const [currentId, setCurrentId] = useState(0)

    const history = useHistory()
    const {deckId} = useParams();


    // Read Deck
    useEffect(()=>{
        async function allCards(){
            const response = await readDeck(`${deckId}`);
            setCards(response.cards)
            setDeckName(response.name)
        }
        allCards()
    }, [])
  

    // FlipClick Handler
    const flipClick = (event) => {
        const cardId = event.target.id
        setCurrentId(parseInt(cardId))
        setFront(!front)
    }


    // NextClick Handler
    const nextClick = () => {
        console.log(`CURRENT ${currentId}`)
        setCurrentId(currentId + 1)
        setFront(false)
        if(currentId === theCards.length -1){
            if(window.confirm(`Restart cards? \n \n Click 'cancel' to return to the home page.`)){
                window.location.reload(false);
            } else {
                history.push("/")
            }
        }
    }


    //Map the cards
    const theCards = cards.map((card, index )=>(
        <section key={index} className="border rounded">
            <h5>Card {index+1} of {cards.length}</h5>
           
            {/* DON'T NEED THESE */}
            <p>Index: {index}</p>
            <p>CardId: {card.id}</p>


            {(front===false) && <p>Front: {card.front}</p>}
            {front && <p>Back: {card.back}</p>}
            <button type="button" className="btn btn-secondary m-2" id={index} onClick={flipClick}>Flip</button>
            {front && <button type="button" className="btn btn-primary" id={index} onClick={nextClick} >Next</button>} 
             {" "}   
        </section>
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
            {" "}Add Cards
        </button>
        </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                {/* BREADCRUMB HEADER BAR */}
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deckName}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Study</li>
                    </ol>
                </nav>
                <h3>{deckName}: Study</h3>
                
                {/* DON'T NEED THIS LINE */}
                <p>STUDY CARDS HERE</p>
                <div>{theCards[currentId]}</div>
            </React.Fragment>
        )
    }
    
}