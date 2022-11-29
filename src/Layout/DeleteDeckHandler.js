import React from "react";
import { deleteDeck } from "../utils/api";


export default function DeleteDeckHandler(id){    
    if(window.confirm("Delete this deck? \n \nYou will not be able to recover it.")) {
        deleteDeck(id);
        window.location.reload(false);         
    }
}