import React from "react";
import { Link } from "react-router-dom";
import CardList from "./CardList";



//Base home page
export default function Home() {
    return(
        <React.Fragment>
            <Link to="/decks/new">
                <button Link to="/decks/new"type="button" className="btn btn-secondary">
                + Create Deck</button>
            </Link>
            <p>{" "}</p>
            <CardList />
        </React.Fragment>
    )
}