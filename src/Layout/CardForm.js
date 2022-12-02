import React from "react";
import { Link } from "react-router-dom";


// Form for AddCard and EditCard
export default function CardForm({HandleSubmit, handleFrontChange, handleBackChange, deckId, front, back, save, cancel}){
    return(
    <form onSubmit={HandleSubmit}>
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
                {cancel}</button></Link>
            
            {" "}

            <button type="submit" className="btn btn-primary">{save}</button>
            </div>
        </form>
    )
}