import React from "react";
import { useParams } from "react-router-dom";
import { deleteDeck } from "../utils/api";


export default function DeleteDeckHandler(params){    
    // const {id} = useParams()
    if(window.confirm("Delete this deck? \n \nYou will not be able to recover it.")) {
        console.log(params)
        // deleteDeck(id);
        // window.location.reload(false);         
    }
}