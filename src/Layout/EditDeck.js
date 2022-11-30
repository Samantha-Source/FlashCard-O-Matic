import React from "react";
import { readDeck, updateDeck } from "../utils/api";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function EditDeck(){
    const {deckId} = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")

    // Change handlers for input fields
    const handleNameChange = (event) => setName(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);
    
    
    // Load the current Deck
    useEffect(() => {
        async function loadDeck(){
        const response = await readDeck(deckId);
        setName(response.name);
        setDescription(response.description)
    }
    loadDeck()
    }, [])

    // Submit Handler
    const HandleSubmit = (event) => {
        event.preventDefault();
        const id = deckId
        const updatedDeck = {id, name, description}
        async function callUpdateDeck(){
            const response = await updateDeck(updatedDeck);
            setDescription(response.description)
            setName(response.name)
        }
        callUpdateDeck()
    }



    return(
    
        <React.Fragment>
        
        {/* BREADCRUMB NAV BAR */}
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
            </ol>
        </nav>
        <h3>Edit Deck</h3>
        
        {/*THE FORM */}
        <form onSubmit={HandleSubmit}>
            <div className="form-group">
                <label htmlFor="name">
                    Name
                    <br></br>
                    <input 
                    className="form-control"
                    // type="text"
                    id="name" 
                    name="name" 
                    placeholder="Name of Deck"
                    value={name}
                    onChange={handleNameChange}
                    />
                </label>
            </div>

            <div>
                <label htmlFor="Description">
                    Description
                    <br></br>
                    <textarea
                    className="form-control"
                    id="description" 
                    name="Description" 
                    placeholder="Back side of the card" 
                    value={description}
                    onChange={handleDescriptionChange}
                    />
                </label>

                <br></br>

                <Link to={`/decks/${deckId}`}>
                    <button 
                    type="button" 
                    className="btn btn-secondary">
                    Cancel</button></Link>
                
                {" "}

                <button
                type="submit"
                className="btn btn-primary">
                    Submit
                    </button>
            </div>
        </form>


      
        </React.Fragment>

    )
}