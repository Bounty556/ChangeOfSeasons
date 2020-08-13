import React, { useState, useEffect, useContext, createContext } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import CardHolder from '../CardHolder';
import { GameContext } from '../../pages/Lobby';

import Parser from './cardScript';
import GameLogic from './gameLogic';

import './gameboard.css';

// Give this function to the children of this component so they can tell us when
// A card was dropped on them
export const CardContext = createContext({
  cardDraggedToPosition: null,
  playerDeck: null
});

// TODO: We definitely need to redo the CSS for all of the cardholders and the cards themselves
//       So things don't look awful
// TODO: When we drag a card and hover it over a card slot, it should make the slot go grey or
//       something similar so the user has some kind of feedback
// TODO: When clicking and dragging the GameCard, the preview image is currently just the cards
//       image, which looks awkward, so we should change that

// useEffect(() => {
//   const test = Parser.parseScript(
//     'ONPLAY RAISEATK ATKROW 1 RAISEDEF ATKROW 1 ONDEATH RAISEATK ATKROW -1 RAISEDEF ATKROW -1'
//   );
//   console.log(test);
// }, []);

function GameBoard(props) {
  const { socket, deck, playerNumber } = useContext(GameContext);

  const [cards, setCards] = useState([
    {
      uId: 0,
      key: 0,
      season: 'Summer',
      position: 'userPlayArea',
      name: 'Gudrun',
      img: 'buddy.png',
      attack: 2,
      resourceCost: 2,
      health: 3
    }
  ]);
  const [playerDeck, setPlayerDeck] = useState(
    deck.map((card, i) => {
      card.key = i;
      card.uId = i;
      card.position = '';
      return card;
    }));

  useEffect(() => {
    // Shuffle player deck
    const shuffledDeck = GameLogic.shuffleArray(playerDeck);
    const assignedDeck = GameLogic.assignHand(shuffledDeck);
    setPlayerDeck(assignedDeck);
  }, []);

  const cardDraggedToPosition = (cardId, position) => {

    // Check to see if this is a position that can't hold multiple cards
    if (position !== 'userPlayArea') {
      // Check to see if the position already has a card
      const cardIndex = playerDeck.findIndex(card => card.position === position);
      if (cardIndex !== -1) {
        return;
      } 
    }

    // Look for the card with the given cardkey
    const cardIndex = playerDeck.findIndex(card => card.uId === cardId);
    const cardVal = playerDeck[cardIndex];
    cardVal.position = position;
    setCards([...playerDeck.filter(card => card.uId !== cardId), cardVal]);
  };

  return (
    <CardContext.Provider value={{ cardDraggedToPosition, playerDeck }}>
      <DndProvider backend={HTML5Backend}>
        <div className='wrapper'>
          <div id='opponentRow'>
            <CardHolder id='opponentGrave' />
            <CardHolder id='opponentDeck' />
            <CardHolder id='opponentPlayArea' />
          </div>

          <div id='opponentDefRow'>
            <CardHolder id='opponentDef1' />
            <CardHolder id='opponentDef2' />
          </div>

          <div id='opponentAttRow'>
            <CardHolder id='opponentAtt1' />
            <CardHolder id='opponentAtt2' />
            <CardHolder id='opponentAtt3' />
          </div>
        </div>

        <hr />

        <div className='wrapper'>
          <div id='userAttRow'>
            <CardHolder id='userAtt1' />
            <CardHolder id='userAtt2' />
            <CardHolder id='userAtt3' />
          </div>

          <div id='userDefRow'>
            <CardHolder id='userDef1' />
            <CardHolder id='userDef2' />
          </div>

          <div id='userRow'>
            <CardHolder id='userGrave' />
            <CardHolder id='userDeck' />
            <CardHolder id='userPlayArea' />
          </div>
        </div>
      </DndProvider>
    </CardContext.Provider>
  );
}

export default GameBoard;
