import React from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";



export default function AddCard(){
    const [deckName, setDeckName] = useState()
    const [returnedDeckId, setReturnedDeckId] = useState() //number
    const [front, setFront] = useState("");
    const [back, setBack] = useState("")


    //deckId & returnedDeckId give same value but different data types
    const {deckId} = useParams() //string
    const history = useHistory()


const handleFrontChange = (event) => setFront(event.target.value)
const handleBackChange = (event) => setBack(event.target.value)
    


    useEffect(() => {
        async function loadDeck(){
        const response = await readDeck(deckId);
        setDeckName(response.name);
        setReturnedDeckId(response.id)
    }
    loadDeck()
    }, [])

    const HandleSubmit = (event) => {
        event.preventDefault();
        console.log(event)
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



    // export async function createCard(deckId, card, signal) {
    //     // There is a bug in json-server, if you post to /decks/:deckId/cards the associated deckId is a string
    //     // and the card is not related to the deck because the data types of the ID's are different.
    //     const url = `${API_BASE_URL}/cards`;
    //     card.deckId = Number(deckId);
    //     const options = {
    //       method: "POST",
    //       headers,
    //       body: JSON.stringify(card),
    //       signal,
    //     };
    //     return await fetchJson(url, options, card);
    //   }

    return(

        <React.Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deckName}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>


        <h4>{`${deckName}: Add Card`}</h4>
        <p>Add Card Page</p>
        <form onSubmit={HandleSubmit}>
            <label htmlFor="front">
                Front
                <br></br>
                <textarea 
                id="front" 
                name="front" 
                placeholder="Front side of card"
                value={front}
                onChange={handleFrontChange}
                 />
            </label>

            <br></br>

            <label htmlFor="back">
                Back
                <br></br>
                <textarea
                 id="back" 
                 name="back" 
                 placeholder="Back side of the card" 
                 value={back}
                 onChange={handleBackChange}
                 />
            </label>

            <br></br>

            <Link to={`/decks/${deckId}`}><button type="button" className="btn btn-secondary">
                Done</button></Link>
            
            {" "}

            <button type="submit" className="btn btn-primary">Save</button>
        
        </form>
        </React.Fragment>
    )
}