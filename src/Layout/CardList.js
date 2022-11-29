import React from "react"
import { listDecks } from "../utils/api"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import DeleteDeckHandler from "./DeleteDeckHandler";


export default function CardList(){
    const [deckList, setDeckList] = useState([]);

  
    useEffect(()=> {
        async function allDecks(){
            const response = await listDecks();
            setDeckList(response)
        }
        allDecks()
    }, [])




    let listing = deckList.map(({name, description, cards, id}, index) => (
        <div class="border rounded m-2 p-2" key={index}>
            <p class="float-right text-muted">{cards.length} cards</p>
            <h3 class="card-title">{name}</h3>
            <p>{description}</p>

            
            <Link to={`/decks/${id}`}>
            <button type="button" class="btn btn-secondary">  
            <span className="oi oi-eye"></span> 
            {" "} View 
            </button>
            </Link>

            {" "}
            
            <Link to={`/decks/${id}/study`}>
            <button type="button" class="btn btn-primary">
            <span className="oi oi-book"></span>
            {" "} Study
            </button>
            </Link>

            {" "}


            <button type="button" class="btn btn-danger float-right" onClick={() =>{DeleteDeckHandler(id)}}>
            <span className="oi oi-trash"></span>
            {" "} Delete
            </button>

            <br></br>
        </div>
    ));
    
    return(
        <React.Fragment>
        <ul>{listing}</ul>
        </React.Fragment>
    )
}