import React from "react";
import { useState } from "react";
import {BrowserRouter as Router, Route, Swtich, Link, NavLink} from "react-router-dom";
import { createDeck } from "../utils/api";
import { useHistory } from "react-router-dom";


export default function CreateDeck () {
    const [text, setText] = useState("")
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
    const history = useHistory()

const handleNameChange = (event) => setName(event.target.value)
const handleDescriptionChange = (event) => setDescription(event.target.value)

const HandleSubmit = (event) => {
    event.preventDefault();
    console.log(event)
    const deck = {name, description}
    createDeck(deck)

}

    return(
        <React.Fragment>
        <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><Link to="/">Home</Link></li>
            <li class="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
        </nav>


        <form onSubmit={HandleSubmit}>
            <label htmlFor="name">
                Name
                <br></br>
                <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Deck Name"
                value={name}
                onChange={handleNameChange}
                 />
            </label>

            <br></br>

            <label htmlFor="description">
                Description
                <br></br>
                <textarea
                 id="description" 
                 name="description" 
                 placeholder="Brief description of the deck" 
                 value={description}
                 onChange={handleDescriptionChange}
                 />
            </label>

            <br></br>

            <Link to="/"><button type="button" class="btn btn-secondary">
                Cancel</button></Link>
            
            {" "}

            <button type="submit" class="btn btn-primary">Submit</button>
        
        </form>
        </React.Fragment>
    )

}
