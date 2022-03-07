import React, { Component } from "react";
import axios from "axios";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeckEmpty: false,
      deck: [],
      deck_id: "",
    };
    this.handleCardDraw = this.handleCardDraw.bind(this);
  }

  async componentDidMount() {
    const deck = await axios.get(
      "https://deckofcardsapi.com/api/deck/new/shuffle"
    );
    this.setState({
      deck_id: deck.data.deck_id,
    });
  }

  async handleCardDraw() {
    const newCard = await axios.get(
      `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/`
    );
    console.log(newCard);
    this.setState((prevState) => {
      return {
        deck: [
          ...prevState.deck,
          {
            code: newCard.data.cards[0].code,
            image: newCard.data.cards[0].image,
          },
        ],
        isDeckEmpty: newCard.data.remaining === 0 ? true : false,
      };
    });
    console.log("Card Drawn");
  }
  render() {
    return (
      <div>
        {!this.state.isDeckEmpty && (
          <button onClick={this.handleCardDraw}>Get a new card</button>
        )}
        <div>
          {this.state.deck.map((card) => {
            return <img src={card.image} key={card.code} alt={card.code} />;
          })}
        </div>
      </div>
    );
  }
}

export default Game;
