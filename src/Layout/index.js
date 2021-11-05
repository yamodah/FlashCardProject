import React, {useState} from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home";
import Study from "../Study";
import CreateDeck from "../CreateDeck";
import EditDeck from "../EditDeck";
import Deck from "../Deck";
import AddCard from "../AddCard";
import EditCard from "../EditCard";
import {Switch,Route} from "react-router-dom"
function Layout() {
  const [decks,setDecks]=useState([])
  const [deck,setDeck]=useState({cards:[]})
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">  
            <Home decks={decks} setDecks={setDecks}/>
          </Route>
          <Route exact path="/decks/:deckId/study">
            <Study deck={deck} setDeck={setDeck}/>
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck/>
          </Route>
          <Route  exact path="/decks/:deckId/edit">
            <EditDeck/>
          </Route>
          <Route  exact path="/decks/:deckId">
            <Deck deck={deck} setDeck={setDeck} setDecks={setDecks}/>
          </Route>
          <Route  exact path="/decks/:deckId/cards/new">
            <AddCard/>
          </Route>
          <Route  exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard/>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
